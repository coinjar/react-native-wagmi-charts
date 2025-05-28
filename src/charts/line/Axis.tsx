import * as React from 'react';
import { ViewProps, StyleSheet } from 'react-native';
import { Line, Text, G, Svg } from 'react-native-svg';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { LineChartDimensionsContext } from './Chart';
import { useLineChart } from './useLineChart';

export type AxisPosition = 'left' | 'right' | 'top' | 'bottom';
export type AxisOrientation = 'horizontal' | 'vertical';

export type AxisProps = ViewProps & {
  position: AxisPosition;
  orientation: AxisOrientation;
  color?: string;
  strokeWidth?: number;
  tickCount?: number;
  domain?: [number, number];
  hideOnInteraction?: boolean;
  format?: (value: number | string) => string | number;
};

export const Axis = ({
  position,
  orientation,
  color = '#666',
  strokeWidth,
  tickCount = 5,
  domain = [0, 100],
  hideOnInteraction = false,
  format = (value) => value,
  ...props
}: AxisProps) => {
  const { width, height } = React.useContext(LineChartDimensionsContext);
  const { isActive } = useLineChart();

  // Add padding for labels
  const padding = {
    left: 50,
    right: 50,
    top: 60,
    bottom: 60,
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: hideOnInteraction && isActive.value ? 0 : 1,
    };
  }, [hideOnInteraction, isActive]);

  const renderTicks = () => {
    const [min, max] = domain;
    const ticks = [];
    const tickLength = 5;
    const labelOffset = 8;

    for (let i = 0; i <= tickCount; i++) {
      const value = min + (max - min) * (i / tickCount);
      const tickPosition = i / tickCount;

      if (orientation === 'vertical') {
        const y = height * (1 - tickPosition);
        const x = position === 'left' ? padding.left : width - padding.right;
        ticks.push(
          <G key={i}>
            {strokeWidth && <Line
              x1={x}
              y1={y}
              x2={position === 'left' ? x - tickLength : x + tickLength}
              y2={y}
              stroke={color}
              strokeWidth={strokeWidth}
            />}
            <Text
              x={position === 'left' ? x - labelOffset : x + labelOffset}
              y={
                i === 0
                  ? y - 15
                  : i === tickCount
                  ? y + 15
                  : y
              }
              fill={color}
              fontSize={10}
              textAnchor={position === 'left' ? 'end' : 'start'}
              alignmentBaseline={
                i === 0
                  ? "baseline"
                  : i === tickCount
                  ? "hanging"
                  : "middle"
              }
            >
              {format(value)}
            </Text>
          </G>
        );
      } else {
        const x = width * tickPosition;
        const y = position === 'top' ? 15 : height - padding.bottom;
        ticks.push(
          <G key={i}>
            {strokeWidth && <Line
              x1={x}
              y1={y}
              x2={x}
              y2={position === 'top' ? y - tickLength : height - 15}
              stroke={color}
              strokeWidth={strokeWidth}
            />}
            <Text
              x={
                i === 0
                  ? x + labelOffset
                  : i === tickCount
                  ? x - labelOffset
                  : x
              }
              y={position === 'top' ? y - labelOffset : height - 15}
              fill={color}
              fontSize={10}
              textAnchor={
                i === 0
                  ? "start"
                  : i === tickCount
                  ? "end"
                  : "middle"
              }
              alignmentBaseline={position === 'top' ? 'baseline' : 'hanging'}
            >
              {format(value)}
            </Text>
          </G>
        );
      }
    }
    return ticks;
  };

  const renderAxis = () => {
    switch (position) {
      case 'left':
        return (
          <>
            {strokeWidth && <Line
              x1={padding.left}
              y1={0}
              x2={padding.left}
              y2={height}
              stroke={color}
              strokeWidth={strokeWidth}
            />}
            {renderTicks()}
          </>
        );
      case 'right':
        return (
          <>
            {strokeWidth && <Line
              x1={width - padding.right}
              y1={0}
              x2={width - padding.right}
              y2={height}
              stroke={color}
              strokeWidth={strokeWidth}
            />}
            {renderTicks()}
          </>
        );
      case 'top':
        return (
          <>
            {strokeWidth && <Line
              x1={0}
              y1={20}
              x2={width}
              y2={20}
              stroke={color}
              strokeWidth={strokeWidth}
            />}
            {renderTicks()}
          </>
        );
      case 'bottom':
        return (
          <>
            {strokeWidth && <Line
              x1={0}
              y1={height - 20}
              x2={width}
              y2={height - 20}
              stroke={color}
              strokeWidth={strokeWidth}
            />}
            {renderTicks()}
          </>
        );
    }
  };

  return (
    <Animated.View style={[styles.container, props.style, animatedStyle]}>
      <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
        {renderAxis()}
      </Svg>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
});