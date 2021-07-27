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
function invokeHaptic() {
  ReactNativeHapticFeedback.trigger('impactLight', {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  });
}
export function Crosshair({ color, enableHapticFeedback = false }) {
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
      currentY.value = -1;
      currentX.value = -1;
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
  return React.createElement(
    PanGestureHandler,
    { minDist: 0, onGestureEvent: onGestureEvent },
    React.createElement(
      Animated.View,
      { style: StyleSheet.absoluteFill },
      React.createElement(
        Animated.View,
        { style: [StyleSheet.absoluteFill, horizontal] },
        React.createElement(Line, { color: color, x: width, y: 0 })
      ),
      React.createElement(
        Animated.View,
        { style: [StyleSheet.absoluteFill, vertical] },
        React.createElement(Line, { color: color, x: 0, y: height })
      )
    )
  );
}
