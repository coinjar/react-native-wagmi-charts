import * as React from 'react';
import { StyleSheet, ViewProps } from 'react-native';
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
import {
  CandlestickChartPriceText,
  CandlestickChartPriceTextProps,
} from './PriceText';
import { useCandlestickChart } from './useCandlestickChart';

type CandlestickChartCrosshairProps = {
  color?: string;
  enableHapticFeedback?: boolean;
  tooltipProps?: Animated.AnimateProps<ViewProps>;
  tooltipTextProps?: CandlestickChartPriceTextProps;
  showTooltip?: boolean;
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
  tooltipProps = {},
  tooltipTextProps = {},
  showTooltip = false,
}: CandlestickChartCrosshairProps) {
  const { currentX, currentY, width, height, step } = useCandlestickChart();

  const tooltipPosition = useSharedValue('left');

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
  const tooltip = useAnimatedStyle(() => ({
    backgroundColor: 'white',
    position: 'absolute',
    display: 'flex',
    top: -12,
    padding: 4,
  }));
  const leftTooltip = useAnimatedStyle(() => ({
    left: 0,
    opacity: tooltipPosition.value === 'left' ? 1 : 0,
  }));
  const rightTooltip = useAnimatedStyle(() => ({
    right: 0,
    opacity: tooltipPosition.value === 'right' ? 1 : 0,
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
          {showTooltip && (
            <>
              <Animated.View
                {...tooltipProps}
                style={[tooltip, leftTooltip, tooltipProps.style]}
              >
                <CandlestickChartPriceText
                  {...tooltipTextProps}
                  style={[{ fontSize: 14 }, tooltipTextProps.style]}
                />
              </Animated.View>
              <Animated.View
                {...tooltipProps}
                style={[tooltip, rightTooltip, tooltipProps.style]}
              >
                <CandlestickChartPriceText
                  {...tooltipTextProps}
                  style={[{ fontSize: 14 }, tooltipTextProps.style]}
                />
              </Animated.View>
            </>
          )}
        </Animated.View>
        <Animated.View style={[StyleSheet.absoluteFill, vertical]}>
          <CandlestickChartLine color={color} x={0} y={height} />
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
}
