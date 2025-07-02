import * as React from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import {
  GestureEvent,
  LongPressGestureHandler,
  LongPressGestureHandlerEventPayload,
  LongPressGestureHandlerProps,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';
import { clamp } from 'react-native-redash';

import { CandlestickChartDimensionsContext } from './Chart';
import { CandlestickChartLine, CandlestickChartLineProps } from './Line';
import { useCandlestickChart } from './useCandlestickChart';
import { CandlestickChartCrosshairTooltipContext } from './CrosshairTooltip';

type MinDurationOverride = LongPressGestureHandlerProps['minDurationMs'];
type MaxDistOverride = LongPressGestureHandlerProps['maxDist'];

type LongPressGestureHandlerOverride = Omit<LongPressGestureHandler, 'minDuration' | 'maxDist'> & {
  /**
   * Minimum time, expressed in milliseconds, that a finger must remain
   * pressed on the corresponding view.
   * @default 0
   */
  minDuration?: MinDurationOverride;
  /**
   * Maximum distance, expressed in points, that defines how far the finger is
   * allowed to travel during a long press gesture. If the finger travels
   * further than the defined distance and the handler hasn't yet activated, 
   * it will fail to recognize the gesture. 
   * @default 999999
   */
  maxDist?: MaxDistOverride;
};

type CandlestickChartCrosshairProps = LongPressGestureHandlerOverride & {
  color?: string;
  children?: React.ReactNode;
  onCurrentXChange?: (value: number) => unknown;
  horizontalCrosshairProps?: Animated.AnimateProps<ViewProps>;
  verticalCrosshairProps?: Animated.AnimateProps<ViewProps>;
  lineProps?: Partial<CandlestickChartLineProps>;
};

export function CandlestickChartCrosshair({
  color,
  onCurrentXChange,
  children,
  horizontalCrosshairProps = {},
  verticalCrosshairProps = {},
  lineProps = {},
  ...props
}: CandlestickChartCrosshairProps) {
  const { width, height } = React.useContext(CandlestickChartDimensionsContext);
  const { currentX, currentY, step } = useCandlestickChart();

  const tooltipPosition = useSharedValue<'left' | 'right'>('left');

  const opacity = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler<
    GestureEvent<LongPressGestureHandlerEventPayload>
  >({
    onActive: ({ x, y }) => {
      const boundedX = x <= width - 1 ? x : width - 1;
      if (boundedX < 100) {
        tooltipPosition.value = 'right';
      } else {
        tooltipPosition.value = 'left';
      }
      opacity.value = 1;
      currentY.value = clamp(y, 0, height);
      currentX.value = boundedX - (boundedX % step) + step / 2;
    },
    onEnd: () => {
      opacity.value = 0;
      currentY.value = -1;
      currentX.value = -1;
    },
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
    <LongPressGestureHandler
      minDurationMs={0}
      maxDist={999999}
      onGestureEvent={onGestureEvent}
      {...props}
    >
      <Animated.View style={StyleSheet.absoluteFill}>
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
        <Animated.View
          style={[StyleSheet.absoluteFill, vertical]}
          {...verticalCrosshairProps}
        >
          <CandlestickChartLine color={color} x={0} y={height} {...lineProps} />
        </Animated.View>
      </Animated.View>
    </LongPressGestureHandler>
  );
}
