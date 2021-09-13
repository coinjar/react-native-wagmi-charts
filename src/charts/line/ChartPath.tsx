import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Svg } from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  withTiming,
} from 'react-native-reanimated';

import { LineChartDimensionsContext } from './Chart';
import { LineChartPath, LineChartPathProps } from './Path';
import { useLineChart } from './useLineChart';

const AnimatedSVG = Animated.createAnimatedComponent(Svg);

type LineChartPathWrapperProps = {
  animationDuration?: number;
  animationProps?: Partial<Animated.WithTimingConfig>;
  color?: string;
  width?: number;
  pathProps?: Partial<LineChartPathProps>;
  showInactivePath?: boolean;
};

export function LineChartPathWrapper({
  animationDuration = 300,
  animationProps = {},
  color = 'black',
  width: pathWidth = 3,
  pathProps = {},
  showInactivePath = true,
}: LineChartPathWrapperProps) {
  const { width, height } = React.useContext(LineChartDimensionsContext);
  const { currentX, isActive } = useLineChart();

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
            color={color}
            width={pathWidth}
            isInactive={showInactivePath}
            {...pathProps}
          />
        </Svg>
      </View>
      <View style={StyleSheet.absoluteFill}>
        <AnimatedSVG animatedProps={svgProps} height={height}>
          <LineChartPath color={color} width={pathWidth} {...pathProps} />
        </AnimatedSVG>
      </View>
    </>
  );
}
