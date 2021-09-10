import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import Svg, { Line as SVGLine } from 'react-native-svg';

import { useLineChart } from './useLineChart';

type LineChartCursorLineProps = {
  color?: string;
  x: number;
  y: number;
};

export const LineChartCursorLine = ({
  color = 'gray',
  x,
  y,
}: LineChartCursorLineProps) => {
  const { currentX, isActive } = useLineChart();

  const vertical = useAnimatedStyle(() => ({
    opacity: isActive.value ? 1 : 0,
    height: '100%',
    transform: [{ translateX: currentX.value }],
  }));

  return (
    <Animated.View style={vertical}>
      <Svg style={StyleSheet.absoluteFill}>
        <SVGLine
          x1={0}
          y1={0}
          x2={x}
          y2={y}
          strokeWidth={2}
          stroke={color}
          strokeDasharray="3 3"
        />
      </Svg>
    </Animated.View>
  );
};
