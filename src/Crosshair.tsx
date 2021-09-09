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

import Line from './Line';
import { PriceText, PriceTextProps } from './PriceText';
import { useCandlestickChart } from './useCandlestickChart';

type CrosshairProps = {
  color?: string;
  enableHapticFeedback?: boolean;
  tooltipProps?: Animated.AnimateProps<ViewProps>;
  tooltipTextProps?: PriceTextProps;
  showTooltip?: boolean;
};

function invokeHaptic() {
  ReactNativeHapticFeedback.trigger('impactLight', {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  });
}

export function Crosshair({
  color,
  enableHapticFeedback = false,
  tooltipProps = {},
  tooltipTextProps = {},
  showTooltip = false,
}: CrosshairProps) {
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
    opacity: tooltipPosition.value === 'left' ? 1 : 0,
  }));
  const rightTooltip = useAnimatedStyle(() => ({
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
          <Line color={color} x={width} y={0} />
          {showTooltip && (
            <>
              <Animated.View
                {...tooltipProps}
                style={[tooltip, leftTooltip, tooltipProps.style, { left: 0 }]}
              >
                <PriceText
                  {...tooltipTextProps}
                  style={[{ fontSize: 14 }, tooltipTextProps.style]}
                />
              </Animated.View>
              <Animated.View
                {...tooltipProps}
                style={[
                  tooltip,
                  rightTooltip,
                  tooltipProps.style,
                  { right: 0 },
                ]}
              >
                <PriceText
                  {...tooltipTextProps}
                  style={[{ fontSize: 14 }, tooltipTextProps.style]}
                />
              </Animated.View>
            </>
          )}
        </Animated.View>
        <Animated.View style={[StyleSheet.absoluteFill, vertical]}>
          <Line color={color} x={0} y={height} />
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
}
