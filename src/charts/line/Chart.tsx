import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Svg } from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  withTiming,
} from 'react-native-reanimated';

import { LineChartPath, LineChartPathProps } from './Path';
import { useLineChart } from './useLineChart';

const AnimatedSVG = Animated.createAnimatedComponent(Svg);

type LineChartProps = {
  animationDuration?: number;
  animationProps?: Partial<Animated.WithTimingConfig>;
  pathColor?: string;
  pathWidth?: number;
  pathProps?: Partial<LineChartPathProps>;
  showInactivePath?: boolean;
};

export function LineChart({
  animationDuration = 300,
  animationProps = {},
  pathColor = 'black',
  pathWidth = 3,
  pathProps = {},
  showInactivePath = true,
}: LineChartProps) {
  const { currentX, isActive, width, height } = useLineChart();

  ////////////////////////////////////////////////

  const svgProps = useAnimatedProps(() => ({
    width: isActive.value
      ? currentX.value
      : withTiming(width, { duration: animationDuration, ...animationProps }),
  }));

  ////////////////////////////////////////////////

  return (
    <>
      <View style={[{ width, height }]}>
        <Svg width={width} height={height}>
          <LineChartPath
            color={pathColor}
            width={pathWidth}
            isInactive={showInactivePath}
            {...pathProps}
          />
        </Svg>
      </View>
      <View style={StyleSheet.absoluteFill}>
        <AnimatedSVG animatedProps={svgProps} height={height}>
          <LineChartPath color={pathColor} width={pathWidth} {...pathProps} />
        </AnimatedSVG>
      </View>
    </>
  );
}
