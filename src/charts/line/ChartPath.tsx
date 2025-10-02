import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { Svg, Defs, ClipPath, Rect, G } from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
  WithTimingConfig,
} from 'react-native-reanimated';
import flattenChildren from 'react-keyed-flatten-children';

import { LineChartDimensionsContext } from './Chart';
import { LineChartPathContext } from './LineChartPathContext';
import { LineChartPath, LineChartPathProps } from './Path';
import { useLineChart } from './useLineChart';

const BACKGROUND_COMPONENTS = [
  'LineChartHighlight',
  'LineChartHorizontalLine',
  'LineChartGradient',
  'LineChartDot',
  'LineChartTooltip',
];
const FOREGROUND_COMPONENTS = ['LineChartHighlight', 'LineChartDot'];

const AnimatedSVG = Animated.createAnimatedComponent(Svg);
const AnimatedRect = Animated.createAnimatedComponent(Rect);

type ReactElementWithDisplayName = React.ReactElement & {
  type?: {
    displayName?: string;
  };
};

type LineChartPathWrapperProps = {
  animationDuration?: number;
  animationProps?: Omit<Partial<WithTimingConfig>, 'duration'>;
  children?: React.ReactNode;
  color?: string;
  inactiveColor?: string;
  width?: number;
  widthOffset?: number;
  pathProps?: Partial<LineChartPathProps>;
  showInactivePath?: boolean;
  animateOnMount?: 'foreground';
  mountAnimationDuration?: number;
  mountAnimationProps?: Partial<WithTimingConfig>;
};

LineChartPathWrapper.displayName = 'LineChartPathWrapper';

export function LineChartPathWrapper({
  animationDuration = 300,
  animationProps = {},
  children,
  color = 'black',
  inactiveColor,
  width: strokeWidth = 3,
  widthOffset = 20,
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
    return () => {
      isMounted.value = false;
    };
  }, []);

  ////////////////////////////////////////////////

  const clipId = React.useMemo(
    () => `clip-foreground-${Math.random().toString(36).substring(2, 11)}`,
    []
  );

  const clipProps = useAnimatedProps(() => {
    const shouldAnimateOnMount = animateOnMount === 'foreground';
    const inactiveWidth =
      !isMounted.value && shouldAnimateOnMount ? 0 : pathWidth;

    let duration =
      shouldAnimateOnMount && !hasMountedAnimation.value
        ? mountAnimationDuration
        : animationDuration;
    const props =
      shouldAnimateOnMount && !hasMountedAnimation.value
        ? mountAnimationProps
        : animationProps;

    if (isActive.value) {
      duration = 0;
    }

    return {
      width: withTiming(
        isActive.value
          ? // on Web, <svg /> elements don't support negative widths
            // https://github.com/coinjar/react-native-wagmi-charts/issues/24#issuecomment-955789904
            Math.max(currentX.value, 0)
          : inactiveWidth + widthOffset,
        Object.assign({ duration }, props),
        () => {
          hasMountedAnimation.value = true;
        }
      ),
    };
  }, [
    animateOnMount,
    animationDuration,
    animationProps,
    currentX,
    hasMountedAnimation,
    isActive,
    isMounted,
    mountAnimationDuration,
    mountAnimationProps,
    pathWidth,
    widthOffset,
  ]);

  const viewSize = React.useMemo(() => ({ width, height }), [width, height]);

  ////////////////////////////////////////////////

  let backgroundChildren;
  let foregroundChildren;
  if (children) {
    const iterableChildren = flattenChildren(children);
    backgroundChildren = iterableChildren.filter((child) =>
      BACKGROUND_COMPONENTS.includes(
        (child as ReactElementWithDisplayName)?.type?.displayName || ''
      )
    );
    foregroundChildren = iterableChildren.filter((child) =>
      FOREGROUND_COMPONENTS.includes(
        (child as ReactElementWithDisplayName)?.type?.displayName || ''
      )
    );
  }

  ////////////////////////////////////////////////

  return (
    <>
      <LineChartPathContext.Provider
        value={{
          color,
          isInactive: showInactivePath,
          isTransitionEnabled: pathProps.isTransitionEnabled ?? true,
        }}
      >
        <View style={viewSize}>
          <Svg width={width} height={height}>
            <LineChartPath
              color={color}
              inactiveColor={inactiveColor}
              width={strokeWidth}
              {...pathProps}
            />
          </Svg>
          <Svg style={StyleSheet.absoluteFill}>{backgroundChildren}</Svg>
        </View>
      </LineChartPathContext.Provider>
      <LineChartPathContext.Provider
        value={{
          color,
          isInactive: false,
          isTransitionEnabled: pathProps.isTransitionEnabled ?? true,
        }}
      >
        <View style={StyleSheet.absoluteFill}>
          {/* On web, animated SVG width doesn't work without
            react-native-svg-web, but that library breaks chart data
            transitions. Use ClipPath instead. On native, AnimatedSVG with
            animated width works correctly. */}
          {Platform.OS === 'web' ? (
            <>
              <Svg width={width} height={height}>
                <Defs>
                  <ClipPath id={clipId}>
                    <AnimatedRect
                      x={0}
                      y={0}
                      animatedProps={clipProps}
                      height={height}
                    />
                  </ClipPath>
                </Defs>
                <G clipPath={`url(#${clipId})`}>
                  <LineChartPath
                    color={color}
                    width={strokeWidth}
                    {...pathProps}
                  />
                </G>
              </Svg>
              <Svg
                width={width}
                height={height}
                style={StyleSheet.absoluteFill}
              >
                <G clipPath={`url(#${clipId})`}>{foregroundChildren}</G>
              </Svg>
            </>
          ) : (
            <>
              <AnimatedSVG animatedProps={clipProps} height={height}>
                <LineChartPath
                  color={color}
                  width={strokeWidth}
                  {...pathProps}
                />
              </AnimatedSVG>
              <AnimatedSVG
                animatedProps={clipProps}
                height={height}
                style={StyleSheet.absoluteFill}
              >
                {foregroundChildren}
              </AnimatedSVG>
            </>
          )}
        </View>
      </LineChartPathContext.Provider>
    </>
  );
}
