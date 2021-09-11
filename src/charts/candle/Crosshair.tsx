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

import { CandlestickChartLine } from './Line';
import { useCandlestickChart } from './useCandlestickChart';
import { CandlestickChartTooltipContext } from './Tooltip';

type CandlestickChartCrosshairProps = {
  color?: string;
  children?: React.ReactNode;
  enableHapticFeedback?: boolean;
};

function invokeHaptic() {
  ReactNativeHapticFeedback.trigger('impactLight', {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  });
}

export function CandlestickChartCrosshair({
  color,
  enableHapticFeedback = false,
  children,
}: CandlestickChartCrosshairProps) {
  const { currentX, currentY, width, height, step } = useCandlestickChart();

  const tooltipPosition = useSharedValue<'left' | 'right'>('left');

  const opacity = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler({
    onActive: ({ x, y }) => {
      if (x < 100) {
        tooltipPosition.value = 'right';
      } else {
        tooltipPosition.value = 'left';
      }
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

  return (
    <PanGestureHandler minDist={0} onGestureEvent={onGestureEvent}>
      <Animated.View style={StyleSheet.absoluteFill}>
        <Animated.View style={[StyleSheet.absoluteFill, horizontal]}>
          <CandlestickChartLine color={color} x={width} y={0} />
          <CandlestickChartTooltipContext.Provider
            value={{ position: tooltipPosition }}
          >
            {children}
          </CandlestickChartTooltipContext.Provider>
        </Animated.View>
        <Animated.View style={[StyleSheet.absoluteFill, vertical]}>
          <CandlestickChartLine color={color} x={0} y={height} />
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
}
