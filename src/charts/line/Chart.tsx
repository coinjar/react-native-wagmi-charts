import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Svg } from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  withTiming,
} from 'react-native-reanimated';

import { LineChartPath } from './Path';
import { useLineChart } from './useLineChart';

const AnimatedSVG = Animated.createAnimatedComponent(Svg);

type LineChartProps = {
  inactivePathColor?: string;
  pathColor?: string;
  gutter?: number;
};

export function LineChart({
  inactivePathColor = '#e0e0e0',
  pathColor = 'black',
}: LineChartProps) {
  const { currentX, isActive, width, height } = useLineChart();

  ////////////////////////////////////////////////

  const svgProps = useAnimatedProps(() => ({
    width: isActive.value ? currentX.value : withTiming(width),
  }));

  ////////////////////////////////////////////////

  return (
    <>
      <View style={[{ width, height }]}>
        <Svg width={width} height={height}>
          <LineChartPath color={inactivePathColor} />
        </Svg>
      </View>
      <View style={StyleSheet.absoluteFill}>
        <AnimatedSVG animatedProps={svgProps} height={height}>
          <LineChartPath color={pathColor} />
        </AnimatedSVG>
      </View>
    </>
  );
}
