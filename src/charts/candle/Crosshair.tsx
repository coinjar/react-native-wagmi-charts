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

type LongPressGestureHandlerOverride = Omit<
  LongPressGestureHandler,
  'minDuration' | 'maxDist'
> & {
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
  showXAxisCrosshair?: boolean;
  offsetYOfLineChart?: number;
  ArrowIconComponent?: React.ComponentType<{ color?: string }>;
};

export function CandlestickChartCrosshair({
  color,
  onCurrentXChange,
  children,
  horizontalCrosshairProps = {},
  verticalCrosshairProps = {},
  lineProps = {},
  showXAxisCrosshair = true,
  offsetYOfLineChart = 0,
  ArrowIconComponent,
  ...props
}: CandlestickChartCrosshairProps) {
  const { width, height } = React.useContext(CandlestickChartDimensionsContext);
  const {
    currentX,
    currentY,
    step,
    currentIndex = -1,
    data,
  } = useCandlestickChart();

  const candle = currentIndex === -1 ? null : data[currentIndex];

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
      // opacity.value = 0;
      currentY.value = -1;
      // currentX.value = -1;
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
    () => currentIndex,
    (index) => {
      if (index === -1 || !data[index]) return;
      const candleX = step * index + step / 2;

      currentX.value = candleX;
      opacity.value = 1;
    },
    [currentIndex]
  );

  useAnimatedReaction(
    () => currentX.value,
    (value, previousValue) => {
      if (
        value !== -1 &&
        value !== previousValue &&
        onCurrentXChange !== undefined
      ) {
        runOnJS(onCurrentXChange)(value);
      }
    }
  );

  if (currentIndex === -1 || !candle) return null;

  return (
    <LongPressGestureHandler
      minDurationMs={0}
      maxDist={999999}
      onGestureEvent={onGestureEvent}
      {...props}
    >
      <Animated.View style={StyleSheet.absoluteFill}>
        {showXAxisCrosshair && (
          <Animated.View
            style={[StyleSheet.absoluteFill, horizontal]}
            {...horizontalCrosshairProps}
          >
            <CandlestickChartLine
              color={color}
              x={width}
              y={0}
              {...lineProps}
            />
          </Animated.View>
        )}
        <CandlestickChartCrosshairTooltipContext.Provider
          value={{ position: tooltipPosition }}
        >
          {children}
        </CandlestickChartCrosshairTooltipContext.Provider>
        <Animated.View
          style={[StyleSheet.absoluteFill, vertical]}
          {...verticalCrosshairProps}
        >
          <Animated.View
            style={{
              position: 'absolute',
              top: height + (offsetYOfLineChart ?? 0) - 14,
              left: -5,
            }}
          >
            {ArrowIconComponent ? (
              <ArrowIconComponent color={color ?? '#EE3A35'} />
            ) : null}
          </Animated.View>
          <CandlestickChartLine
            color={color}
            x={0}
            y={height}
            offsetY={offsetYOfLineChart}
            {...lineProps}
          />
        </Animated.View>
      </Animated.View>
    </LongPressGestureHandler>
  );
}
