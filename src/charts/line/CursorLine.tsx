import React from 'react';
import { StyleSheet, type TextStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useAnimatedProps,
} from 'react-native-reanimated';
import Svg, { type LineProps, Line as SVGLine } from 'react-native-svg';

import type { TFormatterFn } from '../../types';
import { AnimatedText } from '../../components/AnimatedText';
import { LineChartDimensionsContext } from './Chart';
import { LineChartCursor, type LineChartCursorProps } from './Cursor';
import { useLineChartDatetime } from './useDatetime';
import { useLineChart } from './useLineChart';
import { useLineChartPrice } from './usePrice';

type LineChartCursorLineProps = {
  children?: React.ReactNode;
  color?: string;
  lineProps?: Partial<LineProps>;
  format?: TFormatterFn<string | number>;
  textStyle?: TextStyle;
  persistOnEnd?: boolean;
} & Omit<LineChartCursorProps, 'type' | 'children'>;

LineChartCursorLine.displayName = 'LineChartCursorLine';

const TEXT_CONSTANTS = {
  DEFAULT_COLOR: '#1A1E27',
  DEFAULT_FONT_SIZE: 12,
  CHAR_WIDTH_RATIO: 0.6,
  MIN_WIDTH: 25,
  MAX_WIDTH: 150,
  INPUT_PADDING: 4,
} as const;

const SPACING = {
  VERTICAL_TEXT_OFFSET: 40,
  HORIZONTAL_TEXT_MARGIN: 8,
  HORIZONTAL_RIGHT_MARGIN: 16,
  BASE_LINE_GAP: 8,
  X_AXIS_LABEL_RESERVED_HEIGHT: 40, // Reserved space at bottom for x-axis labels
} as const;

const AnimatedLine = Animated.createAnimatedComponent(SVGLine);

export function LineChartCursorLine({
  children,
  color = 'gray',
  lineProps,
  format,
  textStyle,
  ...cursorProps
}: LineChartCursorLineProps) {
  const isHorizontal = cursorProps?.orientation === 'horizontal';
  const { height, width } = React.useContext(LineChartDimensionsContext);
  const { currentX, currentY, isActive } = useLineChart();

  const price = useLineChartPrice({
    format: isHorizontal ? (format as TFormatterFn<string>) : undefined,
    precision: 2,
  });

  const datetime = useLineChartDatetime({
    format: !isHorizontal ? (format as TFormatterFn<number>) : undefined,
  });

  const displayText = isHorizontal ? price.formatted : datetime.formatted;

  const calculateTextWidth = (text: string, fontSize: number) => {
    'worklet';
    const charWidth = fontSize * TEXT_CONSTANTS.CHAR_WIDTH_RATIO;
    const calculatedWidth = text.length * charWidth;
    return Math.max(
      TEXT_CONSTANTS.MIN_WIDTH,
      Math.min(TEXT_CONSTANTS.MAX_WIDTH, calculatedWidth)
    );
  };

  const textWidth = useDerivedValue(() => {
    const text = displayText.value;
    if (!text) return TEXT_CONSTANTS.MIN_WIDTH;

    const fontSize = textStyle?.fontSize || TEXT_CONSTANTS.DEFAULT_FONT_SIZE;
    return calculateTextWidth(text, fontSize);
  }, [displayText, textStyle?.fontSize]);

  const lineEndX = useDerivedValue(() => {
    if (!isHorizontal) return 0;

    const fontSize = textStyle?.fontSize || TEXT_CONSTANTS.DEFAULT_FONT_SIZE;
    const gap = Math.max(SPACING.BASE_LINE_GAP, fontSize * 0.5);

    return (
      width -
      textWidth.value -
      gap -
      TEXT_CONSTANTS.INPUT_PADDING -
      SPACING.HORIZONTAL_RIGHT_MARGIN
    );
  });

  const lineEndY = useDerivedValue(() => {
    if (isHorizontal) return 0;

    // For vertical cursor, extend line to the chart area (excluding reserved label space)
    return height - SPACING.X_AXIS_LABEL_RESERVED_HEIGHT;
  });

  const containerStyle = useAnimatedStyle(() => ({
    opacity: isActive.value ? 1 : 0,
    height: '100%',
    transform: isHorizontal
      ? [{ translateY: currentY.value }]
      : [{ translateX: currentX.value }],
  }));

  const calculateFontSizeAdjustment = (fontSize: number) => {
    'worklet';
    return Math.max(0.6, Math.min(0.8, 0.7 + (fontSize - 12) * 0.01));
  };

  const textPositionStyle = useAnimatedStyle(() => {
    const fontSize = textStyle?.fontSize || TEXT_CONSTANTS.DEFAULT_FONT_SIZE;
    const lineHeight = textStyle?.lineHeight || fontSize * 1.2;

    const baseStyle = {
      position: 'absolute' as const,
      width: textWidth.value,
      fontSize,
      lineHeight,
      color: textStyle?.color || TEXT_CONSTANTS.DEFAULT_COLOR,
      ...textStyle,
    };

    if (isHorizontal) {
      const fontSizeAdjustment = calculateFontSizeAdjustment(fontSize);
      const textCenterOffset = -(lineHeight * fontSizeAdjustment);

      return {
        ...baseStyle,
        left:
          width -
          textWidth.value -
          SPACING.HORIZONTAL_RIGHT_MARGIN +
          TEXT_CONSTANTS.INPUT_PADDING,
        top: textCenterOffset,
        textAlign: 'right' as const,
        paddingLeft: 0,
        paddingRight: 0,
      };
    }

    // For vertical cursor (x-axis label)
    const halfTextWidth = textWidth.value / 2;

    // Since the container is already translated by currentX, we need to calculate
    // the label position relative to the container's position
    const containerX = currentX.value;

    // Calculate where the label would be if centered
    let labelLeft = -halfTextWidth;

    // Check if label would overflow on the left
    if (containerX + labelLeft < 0) {
      labelLeft = -containerX;
    }

    // Check if label would overflow on the right
    if (containerX + labelLeft + textWidth.value > width) {
      labelLeft = width - containerX - textWidth.value;
    }

    // Position label in the reserved space at the bottom
    const labelTop =
      height -
      SPACING.X_AXIS_LABEL_RESERVED_HEIGHT +
      SPACING.HORIZONTAL_TEXT_MARGIN;

    return {
      ...baseStyle,
      left: labelLeft,
      top: labelTop,
      textAlign: 'center' as const,
    };
  });

  const lineAnimatedProps = useAnimatedProps(
    () => ({
      x1: 0,
      y1: 0,
      x2: lineEndX.value,
      y2: lineEndY.value,
    }),
    [lineEndX, lineEndY]
  );

  return (
    <LineChartCursor {...cursorProps} type="line">
      <Animated.View style={containerStyle}>
        <Svg style={styles.svg}>
          <AnimatedLine
            animatedProps={lineAnimatedProps}
            strokeWidth={2}
            stroke={color}
            strokeDasharray="3 3"
            {...lineProps}
          />
        </Svg>
        <AnimatedText text={displayText} style={textPositionStyle} />
      </Animated.View>
      {children}
    </LineChartCursor>
  );
}

const styles = StyleSheet.create({
  svg: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
  },
});
