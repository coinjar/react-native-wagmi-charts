import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Svg } from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useSharedValue,
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
  animateOnMount?: 'foreground';
  mountAnimationDuration?: number;
  mountAnimationProps?: Partial<Animated.WithTimingConfig>;
};

export function LineChartPathWrapper({
  animationDuration = 300,
  animationProps = {},
  children,
  color = 'black',
  width: strokeWidth = 3,
  pathProps = {},
  showInactivePath = true,
  animateOnMount,
  mountAnimationDuration = animationDuration,
  mountAnimationProps = animationProps,
}: LineChartPathWrapperProps) {
  const { height, pathWidth, width } = React.useContext(
    LineChartDimensionsContext
  );
  const { currentX, isActive } = useLineChart();
  const isMounted = useSharedValue(false);
  const hasMountedAnimation = useSharedValue(false);

  React.useEffect(() => {
    isMounted.value = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  ////////////////////////////////////////////////

  const svgProps = useAnimatedProps(() => {
    const shouldAnimateOnMount = animateOnMount === 'foreground';
    const inactiveWidth =
      !isMounted.value && shouldAnimateOnMount ? 0 : pathWidth;

    const duration =
      shouldAnimateOnMount && !hasMountedAnimation.value
        ? mountAnimationDuration
        : animationDuration;
    const props =
      shouldAnimateOnMount && !hasMountedAnimation.value
        ? mountAnimationProps
        : animationProps;

    return {
      width: isActive.value
        ? // on Web, <svg /> elements don't support negative widths
          // https://github.com/coinjar/react-native-wagmi-charts/issues/24#issuecomment-955789904
          Math.max(currentX.value, 0)
        : withTiming(inactiveWidth, Object.assign({ duration }, props), () => {
            hasMountedAnimation.value = true;
          }),
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
