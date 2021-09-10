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

type ChartProps = {
  inactivePathColor?: string;
  pathColor?: string;
  width?: number;
  height?: number;
};

export function LineChart({
  inactivePathColor = '#e0e0e0',
  pathColor = 'black',
  width: widthOverride,
  height: heightOverride,
}: ChartProps) {
  const { currentX, isActive, width, height, setHeight, setWidth } =
    useLineChart();

  ////////////////////////////////////////////////

  React.useEffect(() => {
    if (widthOverride) {
      setWidth(widthOverride);
    }
  }, [widthOverride, setWidth]);

  React.useEffect(() => {
    if (heightOverride) {
      setHeight(heightOverride);
    }
  }, [heightOverride, setHeight]);

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
