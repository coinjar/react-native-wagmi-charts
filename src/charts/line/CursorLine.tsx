import React from 'react';
import { Platform, StyleSheet, TextStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import Svg, { type LineProps, Line as SVGLine } from 'react-native-svg';
import type { TFormatterFn } from 'react-native-wagmi-charts';
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
  // New props for customizing the dynamic sizing
  baseCharWidth?: number;
  minTextWidth?: number;
  maxTextWidth?: number;
  textPadding?: number;
} & Omit<LineChartCursorProps, 'type' | 'children'>;

LineChartCursorLine.displayName = 'LineChartCursorLine';

export function LineChartCursorLine({
  children,
  color = 'gray',
  lineProps,
  format,
  textStyle,
  baseCharWidth = 7, // Slightly reduced for better fit
  minTextWidth = 25, // Reduced min width for small numbers
  maxTextWidth = 120,
  textPadding = 8, // Reduced padding
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

  // Calculate dynamic text width based on character count and type
  const dynamicTextWidth = useDerivedValue(() => {
    const displayText = isHorizontal
      ? price.formatted.value
      : datetime.formatted.value;
    
    if (!displayText) {
      return minTextWidth;
    }

    // More accurate width calculation based on character types
    let calculatedWidth = 0;
    for (let i = 0; i < displayText.length; i++) {
      const char = displayText[i];
      if (char === ',' || char === '.') {
        // Narrower characters
        calculatedWidth += baseCharWidth * 0.4;
      } else if (char === ' ') {
        calculatedWidth += baseCharWidth * 0.5;
      } else {
        // Regular digits and characters
        calculatedWidth += baseCharWidth;
      }
    }
    
    // Add padding and enforce min/max constraints
    calculatedWidth = calculatedWidth + textPadding;
    return Math.max(minTextWidth, Math.min(maxTextWidth, calculatedWidth));
  }, [
    price.formatted,
    datetime.formatted,
    baseCharWidth,
    minTextWidth,
    maxTextWidth,
    textPadding,
  ]);

  // Calculate shortened line length
  const lineLength = useDerivedValue(() => {
    if (isHorizontal) {
      // Reduced gap from 30 to 15 for tighter spacing
      return width - dynamicTextWidth.value - 15;
    }
    return height - 30; // Keep vertical line length as is, or adjust as needed
  }, [dynamicTextWidth, width, height]);

  const animatedStyle = useAnimatedStyle(
    () => ({
      opacity: isActive.value ? 1 : 0,
      height: '100%',
      transform: [
        cursorProps?.orientation === 'horizontal'
          ? { translateY: currentY.value }
          : { translateX: currentX.value },
      ],
    }),
    [currentX, currentY, isActive],
  );

  const animatedTextStyle = useAnimatedStyle(
    () => ({
      position: 'absolute',
      left: isHorizontal
        ? width - dynamicTextWidth.value
        : -dynamicTextWidth.value / 2,
      top: isHorizontal ? (Platform.OS === 'ios' ? -10 : -20) : height - 20,
      color: '#1A1E27',
      fontSize: 12,
      textAlign: isHorizontal ? 'right' : 'center',
      width: dynamicTextWidth.value,
      ...textStyle,
    }),
    [dynamicTextWidth, width, height, textStyle],
  );

  return (
    <LineChartCursor {...cursorProps} type="line">
      <Animated.View style={animatedStyle}>
        <Svg style={styles.svg}>
          <SVGLine
            x1={0}
            y1={0}
            x2={isHorizontal ? lineLength.value : 0}
            y2={isHorizontal ? 0 : height - 20}
            strokeWidth={2}
            stroke={color}
            strokeDasharray="3 3"
            {...lineProps}
          />
        </Svg>
        <AnimatedText
          text={isHorizontal ? price.formatted : datetime.formatted}
          style={animatedTextStyle}
        />
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
