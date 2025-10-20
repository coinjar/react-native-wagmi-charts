import React from 'react';
import { Platform, View, ViewProps, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  AnimatedProps,
} from 'react-native-reanimated';

import { LineChartCursor, LineChartCursorProps } from './Cursor';
import { useLineChart } from './useLineChart';

/**
 * Delay in milliseconds before enabling spring animations on Android. This
 * prevents crashes that can occur when spring animations are enabled on initial
 * render.
 */
const ANDROID_SPRING_ANIMATION_DELAY_MS = 100;

type LineChartCursorCrosshairProps = Omit<
  LineChartCursorProps,
  'children' | 'type'
> & {
  children?: React.ReactNode;
  color?: string;
  size?: number;
  outerSize?: number;
  crosshairWrapperProps?: AnimatedProps<ViewProps>;
  crosshairProps?: ViewProps;
  crosshairOuterProps?: ViewProps;
};

LineChartCursorCrosshair.displayName = 'LineChartCursorCrosshair';

export function LineChartCursorCrosshair({
  children,
  color = 'black',
  size = 8,
  outerSize = 32,
  crosshairWrapperProps = {},
  crosshairProps = {},
  crosshairOuterProps = {},
  ...props
}: LineChartCursorCrosshairProps) {
  const { currentX, currentY, isActive } = useLineChart();

  // It seems that enabling spring animation on initial render on Android causes a crash.
  const [enableSpringAnimation, setEnableSpringAnimation] = React.useState(
    Platform.OS === 'ios'
  );
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setEnableSpringAnimation(true);
    }, ANDROID_SPRING_ANIMATION_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const animatedCursorStyle = useAnimatedStyle(
    () => ({
      transform: [
        { translateX: currentX.value - outerSize / 2 },
        { translateY: currentY.value - outerSize / 2 },
        {
          scale: enableSpringAnimation
            ? withSpring(isActive.value ? 1 : 0, {
                damping: 10,
                stiffness: 100,
                mass: 0.3,
              })
            : 0,
        },
      ],
    }),
    [currentX, currentY, enableSpringAnimation, isActive, outerSize]
  );

  return (
    <LineChartCursor type="crosshair" {...props}>
      <Animated.View
        {...crosshairWrapperProps}
        style={[
          styles.crosshairWrapper,
          {
            width: outerSize,
            height: outerSize,
          },
          animatedCursorStyle,
          crosshairWrapperProps.style,
        ]}
      >
        <View
          {...crosshairOuterProps}
          style={[
            styles.crosshairOuter,
            {
              backgroundColor: color,
              width: outerSize,
              height: outerSize,
              borderRadius: outerSize,
            },
            crosshairOuterProps.style,
          ]}
        />
        <View
          {...crosshairProps}
          style={[
            {
              backgroundColor: color,
              width: size,
              height: size,
              borderRadius: size,
            },
            crosshairProps.style,
          ]}
        />
      </Animated.View>
      {children}
    </LineChartCursor>
  );
}

const styles = StyleSheet.create({
  crosshairWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  crosshairOuter: {
    opacity: 0.1,
    position: 'absolute',
  },
});
