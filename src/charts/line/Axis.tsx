import * as React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { Line, Text, G, Svg } from 'react-native-svg';
import { LineChartDimensionsContext } from './Chart';

export type AxisPosition = 'left' | 'right' | 'top' | 'bottom';
export type AxisOrientation = 'horizontal' | 'vertical';

export type AxisProps = ViewProps & {
  position: AxisPosition;
  orientation: AxisOrientation;
  color?: string;
  strokeWidth?: number;
  tickCount?: number;
  formatLabel?: (value: number) => string;
  domain?: [number, number];
};

export const Axis = ({
  position,
  orientation,
  color = '#666',
  strokeWidth = 1,
  tickCount = 5,
  formatLabel = (value) => value.toString(),
  domain = [0, 100],
  ...props
}: AxisProps) => {
  const { width, height } = React.useContext(LineChartDimensionsContext);

  // Add padding for labels
  const padding = {
    left: 50,
    right: 50,
    top: 20,
    bottom: 30,
  };

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
            <Line
              x1={x}
              y1={y}
              x2={position === 'left' ? x - tickLength : x + tickLength}
              y2={y}
              stroke={color}
              strokeWidth={strokeWidth}
            />
            <Text
              x={position === 'left' ? x - labelOffset : x + labelOffset}
              y={y}
              fill={color}
              fontSize={10}
              textAnchor={position === 'left' ? 'end' : 'start'}
              alignmentBaseline="middle"
            >
              {formatLabel(value)}
            </Text>
          </G>
        );
      } else {
        const x = width * tickPosition;
        const y = position === 'top' ? padding.top : height - padding.bottom;
        ticks.push(
          <G key={i}>
            <Line
              x1={x}
              y1={y}
              x2={x}
              y2={position === 'top' ? y - tickLength : y + tickLength}
              stroke={color}
              strokeWidth={strokeWidth}
            />
            <Text
              x={x}
              y={position === 'top' ? y - labelOffset : y + labelOffset}
              fill={color}
              fontSize={10}
              textAnchor="middle"
              alignmentBaseline={position === 'top' ? 'baseline' : 'hanging'}
            >
              {formatLabel(value)}
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
            <Line
              x1={padding.left}
              y1={0}
              x2={padding.left}
              y2={height}
              stroke={color}
              strokeWidth={strokeWidth}
            />
            {renderTicks()}
          </>
        );
      case 'right':
        return (
          <>
            <Line
              x1={width - padding.right}
              y1={0}
              x2={width - padding.right}
              y2={height}
              stroke={color}
              strokeWidth={strokeWidth}
            />
            {renderTicks()}
          </>
        );
      case 'top':
        return (
          <>
            <Line
              x1={0}
              y1={padding.top}
              x2={width}
              y2={padding.top}
              stroke={color}
              strokeWidth={strokeWidth}
            />
            {renderTicks()}
          </>
        );
      case 'bottom':
        return (
          <>
            <Line
              x1={0}
              y1={height - padding.bottom}
              x2={width}
              y2={height - padding.bottom}
              stroke={color}
              strokeWidth={strokeWidth}
            />
            {renderTicks()}
          </>
        );
    }
  };

  return (
    <View style={[styles.container, props.style]}>
      <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
        {renderAxis()}
      </Svg>
    </View>
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