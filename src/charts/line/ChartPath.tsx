import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { Svg, Defs, ClipPath, Rect, G } from 'react-native-svg';
import type { WithTimingConfig } from 'react-native-reanimated';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { flattenChildren } from './utils/flattenChildren';

import { LineChartDimensionsContext } from './Chart';
import { LineChartPathContext } from './LineChartPathContext';
import type { LineChartPathProps } from './Path';
import { LineChartPath } from './Path';
import { useLineChart } from './useLineChart';

/**
 * Rendered underneath everything else so they stay behind the path and the
 * other background layers
 */
const UNDERLAY_COMPONENTS = ['LineChartDotGrid'];
const BACKGROUND_COMPONENTS = [
  'LineChartHighlight',
  'LineChartHorizontalLine',
  'LineChartGradient',
  'LineChartDot',
];
const FOREGROUND_COMPONENTS = ['LineChartHighlight', 'LineChartDot'];
/**
 * Plain views so they cannot go in the shared `<Svg>`: nesting a view in an
 * SVG container drops it and siblings.
 */
const OVERLAY_COMPONENTS = ['LineChartTooltip'];

const KNOWN_COMPONENTS = [
  ...new Set([
    ...UNDERLAY_COMPONENTS,
    ...BACKGROUND_COMPONENTS,
    ...FOREGROUND_COMPONENTS,
    ...OVERLAY_COMPONENTS,
  ]),
];

/** Display names already reported, so the warning stays out of render loops. */
const warnedComponents = new Set<string>();

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
  }, [isMounted]);

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

  let underlayChildren;
  let backgroundChildren;
  let foregroundChildren;
  let overlayChildren;
  if (children) {
    const iterableChildren = flattenChildren(children);
    const layerOf = (child: React.ReactNode) =>
      (child as ReactElementWithDisplayName)?.type?.displayName || '';

    underlayChildren = iterableChildren.filter((child) =>
      UNDERLAY_COMPONENTS.includes(layerOf(child))
    );
    backgroundChildren = iterableChildren.filter((child) =>
      BACKGROUND_COMPONENTS.includes(layerOf(child))
    );
    foregroundChildren = iterableChildren.filter((child) =>
      FOREGROUND_COMPONENTS.includes(layerOf(child))
    );
    overlayChildren = iterableChildren.filter((child) =>
      OVERLAY_COMPONENTS.includes(layerOf(child))
    );

    // Children are matched by display name so anything unrecognised is dropped
    if (__DEV__) {
      const unreported = iterableChildren
        .map((child) => layerOf(child) || 'unknown')
        .filter(
          (name) =>
            !KNOWN_COMPONENTS.includes(name) && !warnedComponents.has(name)
        );

      if (unreported.length > 0) {
        unreported.forEach((name) => warnedComponents.add(name));
        console.warn(
          `[react-native-wagmi-charts] <LineChart.Path> is ignoring ${unreported.join(
            ', '
          )}. It only renders ${KNOWN_COMPONENTS.join(
            ', '
          )}; any other child is dropped. Render it as a sibling of <LineChart.Path> instead.`
        );
      }
    }
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
          {underlayChildren}
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
      {overlayChildren && overlayChildren.length > 0 && (
        <View pointerEvents="none" style={StyleSheet.absoluteFill}>
          {overlayChildren}
        </View>
      )}
    </>
  );
}
