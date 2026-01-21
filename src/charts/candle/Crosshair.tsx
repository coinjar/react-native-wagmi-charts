import React from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureStateChangeEvent,
  LongPressGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedReaction,
  runOnJS,
  AnimatedProps,
} from 'react-native-reanimated';
import { clamp } from 'react-native-redash';

import { CandlestickChartDimensionsContext } from './Chart';
import { CandlestickChartLine, CandlestickChartLineProps } from './Line';
import { useCandlestickChart } from './useCandlestickChart';
import { CandlestickChartCrosshairTooltipContext } from './CrosshairTooltip';

/**
 * Threshold in pixels from the left edge of the chart. When the cursor is
 * within this distance, the tooltip will be positioned on the right side.
 */
const TOOLTIP_POSITION_THRESHOLD = 100;

type CandlestickChartCrosshairProps = {
  color?: string;
  children?: React.ReactNode;
  onCurrentXChange?: (value: number) => unknown;
  horizontalCrosshairProps?: AnimatedProps<ViewProps>;
  verticalCrosshairProps?: AnimatedProps<ViewProps>;
  lineProps?: Partial<CandlestickChartLineProps>;
  minDurationMs?: number;
};

export function CandlestickChartCrosshair({
  color,
  onCurrentXChange,
  children,
  horizontalCrosshairProps = {},
  verticalCrosshairProps = {},
  lineProps = {},
  minDurationMs = 0,
}: CandlestickChartCrosshairProps) {
  const { width, height } = React.useContext(CandlestickChartDimensionsContext);
  const { currentX, currentY, currentIndex, step } = useCandlestickChart();
  const tooltipPosition = useSharedValue<'left' | 'right'>('left');
  const opacity = useSharedValue(0);

  const updatePosition = (x: number, y: number) => {
    'worklet';
    const boundedX = x <= width - 1 ? x : width - 1;
    if (boundedX < TOOLTIP_POSITION_THRESHOLD) {
      tooltipPosition.value = 'right';
    } else {
      tooltipPosition.value = 'left';
    }
    currentY.value = clamp(y, 0, height);
    currentX.value = boundedX - (boundedX % step) + step / 2;
    currentIndex.value = Math.floor(boundedX / step);
  };

  const longPressGesture = Gesture.LongPress()
    .minDuration(minDurationMs)
    .maxDistance(999999)
    .onStart(
      (event: GestureStateChangeEvent<LongPressGestureHandlerEventPayload>) => {
        'worklet';
        opacity.value = 1;
        updatePosition(event.x, event.y);
      }
    )
    .onTouchesMove((event) => {
      'worklet';
      if (
        opacity.value === 1 &&
        event.allTouches.length > 0 &&
        event.allTouches[0]
      ) {
        updatePosition(event.allTouches[0].x, event.allTouches[0].y);
      }
    })
    .onEnd(() => {
      'worklet';
      opacity.value = 0;
      currentY.value = -1;
      currentX.value = -1;
      currentIndex.value = -1;
    });

  const horizontal = useAnimatedStyle(
    () => ({
      opacity: opacity.value,
      transform: [{ translateY: currentY.value }],
    }),
    [opacity, currentY]
  );

  const vertical = useAnimatedStyle(
    () => ({
      opacity: opacity.value,
      transform: [{ translateX: currentX.value }],
    }),
    [opacity, currentX]
  );

  useAnimatedReaction(
    () => currentX.value,
    (data, prevData) => {
      if (data !== -1 && data !== prevData && onCurrentXChange) {
        runOnJS(onCurrentXChange)(data);
      }
    },
    [currentX]
  );

  return (
    <GestureDetector gesture={longPressGesture}>
      <Animated.View style={StyleSheet.absoluteFill}>
        <Animated.View
          style={[StyleSheet.absoluteFill, vertical]}
          {...verticalCrosshairProps}
        >
          <CandlestickChartLine color={color} x={0} y={height} {...lineProps} />
        </Animated.View>
        <Animated.View
          style={[StyleSheet.absoluteFill, horizontal]}
          {...horizontalCrosshairProps}
        >
          <CandlestickChartLine color={color} x={width} y={0} {...lineProps} />
          <CandlestickChartCrosshairTooltipContext.Provider
            value={{ position: tooltipPosition }}
          >
            {children}
          </CandlestickChartCrosshairTooltipContext.Provider>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
}
