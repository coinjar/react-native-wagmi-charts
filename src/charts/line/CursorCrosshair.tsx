import * as React from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

import { LineChartCursor } from './Cursor';
import { useLineChart } from './useLineChart';

type LineChartCursorCrosshairProps = {
  children?: React.ReactNode;
  color?: string;
  size?: number;
  wrapperSize?: number;
};

export function LineChartCursorCrosshair({
  children,
  color = 'black',
  size = 8,
  wrapperSize = 32,
}: LineChartCursorCrosshairProps) {
  const { currentX, currentY, isActive } = useLineChart();

  const animatedCursorStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: currentX.value - wrapperSize / 2 },
      { translateY: currentY.value - wrapperSize / 2 },
      {
        scale: withSpring(isActive.value ? 1 : 0, {
          damping: 10,
        }),
      },
    ],
  }));

  return (
    <LineChartCursor type="crosshair">
      <Animated.View
        style={[
          {
            width: wrapperSize,
            height: wrapperSize,
            alignItems: 'center',
            justifyContent: 'center',
          },
          animatedCursorStyle,
        ]}
      >
        <View
          style={{
            backgroundColor: color,
            width: wrapperSize,
            height: wrapperSize,
            borderRadius: wrapperSize,
            opacity: 0.1,
            position: 'absolute',
          }}
        />
        <View
          style={{
            backgroundColor: color,
            width: size,
            height: size,
            borderRadius: size,
          }}
        />
      </Animated.View>
      {children}
    </LineChartCursor>
  );
}
