import * as React from 'react';
import { StyleSheet } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';
import { clamp } from 'react-native-redash';

import Line from './Line';
import { useCandlestickChart } from './useCandlestickChart';

type CrosshairProps = {
  enableHapticFeedback?: boolean;
};

function invokeHaptic() {
  console.log('test');
  ReactNativeHapticFeedback.trigger('impactLight', {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  });
}

export function Crosshair({ enableHapticFeedback = false }: CrosshairProps) {
  const { currentX, currentY, width, height, step } = useCandlestickChart();

  const opacity = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler({
    onActive: ({ x, y }) => {
      opacity.value = 1;
      currentY.value = clamp(y, 0, height);
      currentX.value = x - (x % step) + step / 2;
    },
    onEnd: () => {
      opacity.value = 0;
    },
  });
  const horizontal = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: currentY.value }],
  }));
  const vertical = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: currentX.value }],
  }));

  useAnimatedReaction(
    () => (enableHapticFeedback ? currentX.value : 0),
    (data) => {
      if (data !== 0) {
        runOnJS(invokeHaptic)();
      }
    }
  );

  return (
    <PanGestureHandler minDist={0} onGestureEvent={onGestureEvent}>
      <Animated.View style={StyleSheet.absoluteFill}>
        <Animated.View style={[StyleSheet.absoluteFill, horizontal]}>
          <Line x={width} y={0} />
        </Animated.View>
        <Animated.View style={[StyleSheet.absoluteFill, vertical]}>
          <Line x={0} y={height} />
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
}
