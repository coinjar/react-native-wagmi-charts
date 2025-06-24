import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
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
} & Omit<LineChartCursorProps, 'type' | 'children'>;

LineChartCursorLine.displayName = 'LineChartCursorLine';

export function LineChartCursorLine({
  children,
  color = 'gray',
  lineProps,
  text,
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

  // Shared value to store text width
  const textWidth = useSharedValue(50);

  // Function to estimate text width (approximate calculation)
  const estimateTextWidth = (text: string, fontSize = 12) => {
    // Rough approximation: each character is about 0.6 * fontSize wide
    // You might want to adjust this multiplier based on your font
    const avgCharWidth = fontSize * 0.6;
    return Math.max(text.length * avgCharWidth + 16, 30); // +16 for padding, minimum 30
  };

  // Update text width when text changes
  React.useEffect(() => {
    const currentText = isHorizontal ? price.formatted || '' : '';
    const newWidth = isHorizontal ? estimateTextWidth(currentText) : 50;
    textWidth.value = newWidth;
  }, [price.formatted, isHorizontal, textWidth]);

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

  const textPosition = useDerivedValue(() => {
    if (isHorizontal) {
      return {
        left: width - textWidth.value - 10, // Position text at the right with padding
        textAlign: 'right' as const,
      };
    }
    const labelWidth = 100;
    const padding = 10;

    let left = -labelWidth / 2;
    let textAlign: 'left' | 'center' | 'right' = 'center';

    if (currentX.value + left < padding) {
      left = padding - currentX.value;
      textAlign = 'left';
    } else if (currentX.value + left + labelWidth > width - padding) {
      left = width - padding - labelWidth - currentX.value;
      textAlign = 'right';
    }

    return { left, textAlign };
  }, [currentX, width, isHorizontal, textWidth]);

  const textAnimatedStyle = useAnimatedStyle(
    () => ({
      position: 'absolute' as const,
      right: isHorizontal ? 10 : undefined, // Use right positioning for horizontal
      left: isHorizontal ? undefined : textPosition.value.left,
      top: isHorizontal ? -20 : height - 20,
      color: '#1A1E27',
      fontSize: 12,
      textAlign: isHorizontal ? 'right' : textPosition.value.textAlign,
      width: isHorizontal ? textWidth.value : 100,
      paddingHorizontal: isHorizontal ? 8 : 0,
    }),
    [textPosition, height, isHorizontal, textWidth],
  );

  return (
    <LineChartCursor {...cursorProps} type="line">
      <Animated.View style={animatedStyle}>
        <Svg style={styles.svg}>
          <SVGLine
            x1={0}
            y1={0}
            x2={isHorizontal ? width - 80 : 0} // Fixed length that accounts for text
            y2={isHorizontal ? 0 : height - 20}
            strokeWidth={2}
            stroke={color}
            strokeDasharray="3 3"
            {...lineProps}
          />
        </Svg>
        <AnimatedText
          text={isHorizontal ? price.formatted : datetime.formatted}
          style={[textAnimatedStyle, textStyle]}
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
