import * as React from 'react';
import { StyleSheet } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { clamp } from 'react-native-redash';

import Line from './Line';
import Label from './Label';
import { useCandlestickChart } from './useCandlestickChart';

type CrosshairProps = {
  includeLabel?: boolean;
};

export function Crosshair({ includeLabel = true }: CrosshairProps) {
  const { width, height, domain, step } = useCandlestickChart();

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler({
    onActive: ({ x, y }) => {
      opacity.value = 1;
      translateY.value = clamp(y, 0, height);
      translateX.value = x - (x % step) + step / 2;
    },
    onEnd: () => {
      opacity.value = 0;
    },
  });
  const horizontal = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));
  const vertical = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <PanGestureHandler minDist={0} onGestureEvent={onGestureEvent}>
      <Animated.View style={StyleSheet.absoluteFill}>
        <Animated.View style={[StyleSheet.absoluteFill, horizontal]}>
          <Line x={width} y={0} />
        </Animated.View>
        <Animated.View style={[StyleSheet.absoluteFill, vertical]}>
          <Line x={0} y={height} />
        </Animated.View>
        {includeLabel && (
          <Label
            translateY={translateY}
            maxHeight={height}
            domain={domain}
            opacity={opacity}
          />
        )}
      </Animated.View>
    </PanGestureHandler>
  );
}
