import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import Svg, { Line as SVGLine, LineProps, Text as SVGText } from 'react-native-svg';
import { LineChartDimensionsContext } from './Chart';
import { LineChartCursor, LineChartCursorProps } from './Cursor';
import { useLineChart } from './useLineChart';
import { useLineChartPrice } from './usePrice';
import { useLineChartDatetime } from './useDatetime';
import { AnimatedText } from '../../components/AnimatedText';

type LineChartCursorLineProps = {
  children?: React.ReactNode;
  color?: string;
  lineProps?: Partial<LineProps>;
  text?: string;
  textStyle?: any;
} & Omit<LineChartCursorProps, 'type' | 'children'>;

LineChartCursorLine.displayName = 'LineChartCursorLine';

export function LineChartCursorLine({
  children,
  color = 'gray',
  lineProps,
  text,
  textStyle,
  ...cursorProps
}: LineChartCursorLineProps) {
  const { height, width } = React.useContext(LineChartDimensionsContext);
  const { currentX, currentY, isActive, currentIndex } = useLineChart();
  const price = useLineChartPrice({ precision: 2 });
  const datetime = useLineChartDatetime();
  
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

  const isHorizontal = cursorProps?.orientation === 'horizontal';

  return (
    <LineChartCursor {...cursorProps} type="line">
      <Animated.View style={animatedStyle}>
        <Svg style={styles.svg}>
          <SVGLine
            x1={0}
            y1={0}
            x2={isHorizontal ? width : 0}
            y2={isHorizontal ? 0 : height}
            strokeWidth={2}
            stroke={color}
            strokeDasharray="3 3"
            {...lineProps}
          />
        </Svg>
        <AnimatedText
          text={isHorizontal ? price.formatted : datetime.formatted}
          style={[
            {
              position: 'absolute',
              left: isHorizontal ? width - 50 : 5,
              top: isHorizontal ? 12 : height - 5,
              color,
              fontSize: 12,
              textAlign: isHorizontal ? 'right' : 'left',
              width: isHorizontal ? 50 : 100,
            },
            textStyle,
          ]}
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