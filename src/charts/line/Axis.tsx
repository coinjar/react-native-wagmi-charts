import * as React from 'react';
import { ViewProps, StyleSheet, Text, TextStyle } from 'react-native';
import { Line, Svg } from 'react-native-svg';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { LineChartDimensionsContext } from './Chart';
import { useLineChart } from './useLineChart';

export type LineChartAxisPosition = 'left' | 'right' | 'top' | 'bottom';
export type LineChartAxisOrientation = 'horizontal' | 'vertical';

export type LineChartAxisProps = ViewProps & {
  position: LineChartAxisPosition;
  orientation: LineChartAxisOrientation;
  color?: string;
  strokeWidth?: number;
  tickCount?: number;
  domain?: [number, number];
  hideOnInteraction?: boolean;
  format?: (value: number | string) => string | number;
  textStyle?: TextStyle;
};

export const LineChartAxis = ({
  position,
  orientation,
  color = '#666',
  strokeWidth,
  tickCount = 5,
  domain = [0, 100],
  hideOnInteraction = false,
  format = (value) => value,
  textStyle,
  ...props
}: LineChartAxisProps) => {
  const { width, height } = React.useContext(LineChartDimensionsContext);
  const { isActive } = useLineChart();

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
    const labels = [];
    const tickLength = 5;
    const labelOffset = 8;

    for (let i = 0; i <= tickCount; i++) {
      const value = min + (max - min) * (i / tickCount);
      const tickPosition = i / tickCount;

      if (orientation === 'vertical') {
        const y = height * (1 - tickPosition);
        const x = position === 'left' ? padding.left : width - padding.right;

        if (strokeWidth) {
          ticks.push(
            <Line
              key={`tick-${i}`}
              x1={x}
              y1={y}
              x2={position === 'left' ? x - tickLength : x + tickLength}
              y2={y}
              stroke={color}
              strokeWidth={strokeWidth}
            />
          );
        }

        labels.push(
          <Animated.View
            key={`label-${i}`}
            style={[
              styles.verticalLabel,
              {
                left: position === 'left' ? Math.max(0, x - labelOffset - 40) : Math.min(width - 50, x + labelOffset),
                top: Math.max(0, Math.min(height - 20, i === 0 ? y - 15 : i === tickCount ? y + 5 : y - 10)),
                alignItems: position === 'left' ? 'flex-end' : 'flex-start',
              },
            ]}
          >
            <Text
              numberOfLines={1}
              ellipsizeMode="clip"
              style={[
                styles.labelText,
                {
                  color: color,
                  textAlign: position === 'left' ? 'right' : 'left',
                },
                textStyle,
              ]}
            >
              {String(format(value))}
            </Text>
          </Animated.View>
        );
      } else {
        const x = width * tickPosition;
        const y = position === 'top' ? 15 : height - padding.bottom;

        if (strokeWidth) {
          ticks.push(
            <Line
              key={`tick-${i}`}
              x1={x}
              y1={y}
              x2={x}
              y2={position === 'top' ? y - tickLength : height - 15}
              stroke={color}
              strokeWidth={strokeWidth}
            />
          );
        }

        labels.push(
          <Animated.View
            key={`label-${i}`}
            style={[
              styles.horizontalLabel,
              {
                left: Math.max(0, Math.min(width - 50, i === 0 ? x + labelOffset : i === tickCount ? x - 50 - labelOffset : x - 25)),
                top: position === 'top' ? Math.max(0, y - labelOffset - 15) : Math.max(0, height - 35),
                alignItems: i === 0 ? 'flex-start' : i === tickCount ? 'flex-end' : 'center',
              },
            ]}
          >
            <Text
              numberOfLines={1}
              ellipsizeMode="clip"
              style={[
                styles.labelText,
                {
                  color: color,
                  textAlign: i === 0 ? 'left' : i === tickCount ? 'right' : 'center',
                },
                textStyle,
              ]}
            >
              {String(format(value))}
            </Text>
          </Animated.View>
        );
      }
    }

    return { ticks, labels };
  };

  const renderAxis = () => {
    const { ticks, labels } = renderTicks();

    let axisLine = null;

    if (strokeWidth) {
      switch (position) {
        case 'left':
            axisLine = (
              <Line
                x1={padding.left}
                y1={0}
                x2={padding.left}
                y2={height}
                stroke={color}
                strokeWidth={strokeWidth}
              />
            );
          break;
        case 'right':
            axisLine = (
              <Line
                x1={width - padding.right}
                y1={0}
                x2={width - padding.right}
                y2={height}
                stroke={color}
                strokeWidth={strokeWidth}
              />
            );
          break;
        case 'top':
            axisLine = (
              <Line
                x1={0}
                y1={20}
                x2={width}
                y2={20}
                stroke={color}
                strokeWidth={strokeWidth}
              />
            );
          break;
        case 'bottom':
            axisLine = (
              <Line
                x1={0}
                y1={height - 20}
                x2={width}
                y2={height - 20}
                stroke={color}
                strokeWidth={strokeWidth}
              />
            );
          break;
      }
    }

    return { axisLine, ticks, labels };
  };

  const { axisLine, ticks, labels } = renderAxis();

  return (
    <Animated.View style={[styles.container, props.style, animatedStyle]}>
      <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
        {axisLine}
        {ticks}
      </Svg>
      <Animated.View style={[StyleSheet.absoluteFill, styles.labelsContainer]}>
        {labels}
      </Animated.View>
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
  verticalLabel: {
    position: 'absolute',
    width: 40,
    minHeight: 20,
    zIndex: 1000,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  horizontalLabel: {
    position: 'absolute',
    width: 50,
    minHeight: 20,
    zIndex: 1000,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  labelText: {
    fontSize: 10,
  },
  labelsContainer: {
    zIndex: 1000,
  },
});