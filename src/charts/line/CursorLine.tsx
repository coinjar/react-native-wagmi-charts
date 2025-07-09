import React from 'react';
import { StyleSheet, type TextStyle } from 'react-native';
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
  minTextWidth = 25,
  maxTextWidth = 150,
  textPadding = 12,
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

    // Dynamic character width calculation based on font size (consistent with Axis component)
    const fontSize = textStyle?.fontSize || 12;
    const charWidth = fontSize * 0.6; // Same ratio as Axis component
    const calculatedWidth = displayText.length * charWidth + textPadding;
    return Math.max(minTextWidth, Math.min(maxTextWidth, calculatedWidth));
  }, [
    price.formatted,
    datetime.formatted,
    minTextWidth,
    maxTextWidth,
    textPadding,
    textStyle?.fontSize,
  ]);

  // Calculate shortened line length
  const lineLength = useDerivedValue(() => {
    if (isHorizontal) {
      // Leave space for text + gap + padding
      const gap = 12;
      const rightPadding = 8;
      return width - dynamicTextWidth.value - gap - rightPadding;
    }
    // For vertical lines, leave space for text container
    const fontSize = textStyle?.fontSize || 12;
    const lineHeight = fontSize * 1.2;
    const gap = 8;
    return height - lineHeight - gap;
  }, [dynamicTextWidth, width, height, textStyle?.fontSize]);

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
    () => {
      const fontSize = textStyle?.fontSize || 12;
      const lineHeight = textStyle?.lineHeight || fontSize * 1.2;
      
      if (isHorizontal) {
        // For horizontal lines: center the text on the line (line is at y=0)
        // React Native Text has intrinsic padding above the baseline
        // We need to position the text container so the visual center aligns with y=0
        // Scale the offset based on actual font size for better centering with any text size
        const baseOffset = 0.7; // Base offset ratio that works for default font sizes
        const fontSizeAdjustment = Math.max(0.6, Math.min(0.8, 0.7 + (fontSize - 12) * 0.01)); // Adjust based on font size
        const textCenterOffset = -(lineHeight * fontSizeAdjustment);
        
        return {
          position: 'absolute',
          left: width - dynamicTextWidth.value - 8,
          top: textCenterOffset, // Position text so line runs through visual center
          height: lineHeight,
          color: '#1A1E27',
          fontSize: fontSize, // Use actual font size from textStyle
          textAlign: 'right',
          width: dynamicTextWidth.value,
          paddingRight: 8,
          lineHeight: lineHeight,
          // Add flex properties to help with text centering
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          ...textStyle,
        };
      } else {
        // For vertical lines: position text at the bottom of the line
        return {
          position: 'absolute',
          left: -dynamicTextWidth.value / 2, // Center horizontally on the vertical line
          top: lineLength.value + 8, // Position below the line end
          height: lineHeight,
          color: '#1A1E27',
          fontSize: fontSize, // Use actual font size from textStyle
          textAlign: 'center',
          width: dynamicTextWidth.value,
          display: 'flex',
          justifyContent: 'center', // Center text vertically within container
          alignItems: 'center', // Center text horizontally
          ...textStyle,
        };
      }
    },
    [dynamicTextWidth, width, height, textStyle, lineLength],
  );

  return (
    <LineChartCursor {...cursorProps} type="line">
      <Animated.View style={animatedStyle}>
        <Svg style={styles.svg}>
          <SVGLine
            x1={0}
            y1={0}
            x2={isHorizontal ? lineLength.value : 0}
            y2={isHorizontal ? 0 : lineLength.value}
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
