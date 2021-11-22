import * as React from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { View } from 'react-native';
import { getYForX, parse } from 'react-native-redash';
import { useMemo } from 'react';

import { LineChartDimensionsContext } from './Chart';
import { useLineChart } from './useLineChart';
import type { ViewProps } from 'react-native';

export type LineChartDotProps = {
  dotProps?: ViewProps;
  outerDotProps?: ViewProps;
  color?: string;
  at: number;
  size?: number;
  /**
   * If `always`, the outer dot will still animate when interaction is active.
   *
   * If `never`, the outer dot will never animate.
   *
   * If `while-inactive`, the outer dot will animate only when the interaction is inactive.
   *
   * Default: `while-inactive`
   */
  pulsesOuter?: 'always' | 'while-inactive' | 'never';
  /**
   * Defaults to `size * 4`
   */
  outerSize?: number;
  pulseDurationMs?: number;
};

LineChartDot.displayName = 'LineChartDot';

export function LineChartDot({
  color = 'black',
  at,
  size = 8,
  pulsesOuter = 'while-inactive',
  outerSize = size * 4,
  dotProps,
  outerDotProps,
}: LineChartDotProps) {
  const { data, isActive } = useLineChart();
  const { path, pathWidth: width } = React.useContext(
    LineChartDimensionsContext
  );

  const parsedPath = React.useMemo(() => parse(path), [path]);
  const pointWidth = React.useMemo(
    () => width / (data.length - 1),
    [data.length, width]
  );

  const x = useDerivedValue(() => withTiming(pointWidth * at));
  const y = useDerivedValue(() =>
    withTiming(getYForX(parsedPath!, x.value) || 0)
  );

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: x.value - outerSize / 2 },
        { translateY: y.value - outerSize / 2 },
      ],
    };
  });
  const outerStyle = useAnimatedStyle(() => {
    let opacity = 0.1;
    if (pulsesOuter === 'never') {
      return {
        opacity,
      };
    }
    const enterMs = 800;
    const easing = Easing.out(Easing.sin);
    const animatedOpacity = withRepeat(
      withSequence(
        withTiming(0.8),
        withTiming(0, {
          duration: enterMs,
          easing,
        })
      ),
      -1,
      false
    );
    const scale = withRepeat(
      withSequence(
        withTiming(0),
        withTiming(1, {
          duration: enterMs,
          easing,
        })
      ),
      -1,
      false
    );

    if (pulsesOuter === 'while-inactive') {
      return {
        opacity: isActive.value ? withTiming(0) : animatedOpacity,
        transform: [
          {
            scale: isActive.value ? withTiming(0) : scale,
          },
        ],
      };
    }
    return {
      opacity: animatedOpacity,
      transform: [
        {
          scale,
        },
      ],
    };
  }, [pulsesOuter]);

  return (
    <Animated.View
      pointerEvents="none"
      style={useMemo(
        () => [
          {
            width: outerSize,
            height: outerSize,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
          },
          containerStyle,
        ],
        [containerStyle, outerSize]
      )}
    >
      <Animated.View
        {...outerDotProps}
        style={useMemo(
          () => [
            {
              backgroundColor: color,
              width: outerSize,
              height: outerSize,
              borderRadius: outerSize,
              position: 'absolute',
            },
            outerStyle,
            outerDotProps?.style,
          ],
          [color, outerSize, outerStyle, outerDotProps?.style]
        )}
      />
      <View
        {...dotProps}
        style={useMemo(
          () => [
            {
              backgroundColor: color,
              width: size,
              height: size,
              borderRadius: size,
            },
            dotProps?.style,
          ],
          [color, size, dotProps?.style]
        )}
      />
    </Animated.View>
  );
}
