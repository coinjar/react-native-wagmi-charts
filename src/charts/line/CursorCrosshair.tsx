import * as React from 'react';
import { View, ViewProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

import { LineChartCursor, LineChartCursorProps } from './Cursor';
import { useLineChart } from './useLineChart';

type LineChartCursorCrosshairProps = Omit<LineChartCursorProps, 'type'> & {
  children?: React.ReactNode;
  color?: string;
  size?: number;
  outerSize?: number;
  crosshairWrapperProps?: Animated.AnimateProps<ViewProps>;
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

  const animatedCursorStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: currentX.value - outerSize / 2 },
      { translateY: currentY.value - outerSize / 2 },
      {
        scale: withSpring(isActive.value ? 1 : 0, {
          damping: 10,
        }),
      },
    ],
  }));

  return (
    <LineChartCursor type="crosshair" {...props}>
      <Animated.View
        {...crosshairWrapperProps}
        style={[
          {
            width: outerSize,
            height: outerSize,
            alignItems: 'center',
            justifyContent: 'center',
          },
          animatedCursorStyle,
          crosshairWrapperProps.style,
        ]}
      >
        <View
          {...crosshairOuterProps}
          style={[
            {
              backgroundColor: color,
              width: outerSize,
              height: outerSize,
              borderRadius: outerSize,
              opacity: 0.1,
              position: 'absolute',
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
