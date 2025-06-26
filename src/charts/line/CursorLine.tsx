import React from 'react';
import { Platform, StyleSheet } from 'react-native';
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
  text?: string;
  format?: TFormatterFn<string | number>;
  textStyle?: any;
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
  text,
  format,
  textStyle,
  baseCharWidth = 8, // Approximate width per character
  minTextWidth = 30,
  maxTextWidth = 120,
  textPadding = 10,
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

  // Calculate dynamic text width based on character count
  const dynamicTextWidth = useDerivedValue(() => {
    const displayText = isHorizontal
      ? price.formatted.value
      : datetime.formatted.value;
    const charCount = displayText?.length || 0;
    const calculatedWidth = Math.max(
      minTextWidth,
      Math.min(maxTextWidth, charCount * baseCharWidth + textPadding),
    );
    return calculatedWidth;
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
      return width - dynamicTextWidth.value - 30;
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
