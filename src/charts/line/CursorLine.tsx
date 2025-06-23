import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue } from 'react-native-reanimated';
import Svg, { Line as SVGLine, LineProps } from 'react-native-svg';
import { LineChartDimensionsContext } from './Chart';
import { LineChartCursor, LineChartCursorProps } from './Cursor';
import { useLineChart } from './useLineChart';
import { useLineChartPrice } from './usePrice';
import { useLineChartDatetime } from './useDatetime';
import { AnimatedText } from '../../components/AnimatedText';
import { TFormatterFn } from 'react-native-wagmi-charts';

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
    format: isHorizontal ? format as TFormatterFn<string> : undefined,
    precision: 2
  });

  const datetime = useLineChartDatetime({
    format: !isHorizontal ? format as TFormatterFn<number> : undefined
  });
  
  const textPosition = useDerivedValue(() => {
    if (isHorizontal) {
      return {
        left: width - 60,
        textAlign: 'right' as const,
      };
    } else {
      const labelWidth = 100;
      const padding = 10;
      
      let left = -labelWidth / 2; 
      let textAlign: 'left' | 'center' | 'right' = 'center';
      
      if (currentX.value + left < padding) {
        left = padding - currentX.value;
        textAlign = 'left';
      }
      else if (currentX.value + left + labelWidth > width - padding) {
        left = (width - padding - labelWidth) - currentX.value;
        textAlign = 'right';
      }
      
      return { left, textAlign };
    }
  }, [currentX, width, isHorizontal]);
  
  const animatedStyle = useAnimatedStyle(
    () => ({
      opacity: isActive.value ? 1 : 0,
      height: '100%',
      transform: [
        cursorProps?.orientation === 'horizontal' 
          ? { translateY: currentY.value } 
          : { translateX: currentX.value }
      ],
    }),
    [currentX, currentY, isActive]
  );

  const textAnimatedStyle = useAnimatedStyle(
    () => ({
      position: 'absolute' as const,
      left: isHorizontal ? width - 60 : textPosition.value.left,
      top: isHorizontal ? -20 : height - 20,
      color: '#1A1E27',
      fontSize: 12,
      textAlign: textPosition.value.textAlign,
      width: isHorizontal ? 50 : 100,
    }),
    [textPosition, width, height, isHorizontal]
  );

  return (
    <LineChartCursor {...cursorProps} type="line">
      <Animated.View style={animatedStyle}>
        <Svg style={styles.svg}>
          <SVGLine
            x1={0}
            y1={0}
            x2={isHorizontal ? width - 60 : 0}
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