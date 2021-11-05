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

export const LineChartPathContext = React.createContext({
  color: '',
  isTransitionEnabled: true,
});

type LineChartPathWrapperProps = {
  animationDuration?: number;
  animationProps?: Partial<Animated.WithTimingConfig>;
  children?: React.ReactNode;
  color?: string;
  width?: number;
  pathProps?: Partial<LineChartPathProps>;
  showInactivePath?: boolean;
};

export function LineChartPathWrapper({
  animationDuration = 300,
  animationProps = {},
  children,
  color = 'black',
  width: strokeWidth = 3,
  pathProps = {},
  showInactivePath = true,
}: LineChartPathWrapperProps) {
  const { height, pathWidth, width } = React.useContext(
    LineChartDimensionsContext
  );
  const { currentX, isActive } = useLineChart();

  ////////////////////////////////////////////////

  const svgProps = useAnimatedProps(() => {
    return {
      width: isActive.value
        ? // on Web, <svg /> elements don't support negative widths
          // https://github.com/coinjar/react-native-wagmi-charts/issues/24#issuecomment-955789904
          Math.max(currentX.value, 0)
        : withTiming(
            pathWidth,
            Object.assign({ duration: animationDuration }, animationProps)
          ),
    };
  });

  const viewSize = React.useMemo(() => ({ width, height }), [width, height]);

  ////////////////////////////////////////////////

  return (
    <LineChartPathContext.Provider
      value={{
        color,
        isTransitionEnabled: pathProps.isTransitionEnabled ?? true,
      }}
    >
      <View style={viewSize}>
        <Svg width={width} height={height}>
          {children}
          <LineChartPath
            color={color}
            width={strokeWidth}
            isInactive={showInactivePath}
            {...pathProps}
          />
        </Svg>
      </View>
      <View style={StyleSheet.absoluteFill}>
        <AnimatedSVG animatedProps={svgProps} height={height}>
          <LineChartPath color={color} width={strokeWidth} {...pathProps} />
        </AnimatedSVG>
      </View>
    </LineChartPathContext.Provider>
  );
}
