import React from 'react';

import Animated, { runOnJS } from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureStateChangeEvent,
  LongPressGestureHandlerEventPayload,
} from 'react-native-gesture-handler';

import { LineChartDimensionsContext } from './Chart';
import { StyleSheet } from 'react-native';
import { bisectCenter } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { useLineChart } from './useLineChart';
import { useEffect } from 'react';

export type LineChartCursorProps = {
  children: React.ReactNode;
  type: 'line' | 'crosshair';
  // Does not work on web due to how the Cursor operates on web
  snapToPoint?: boolean;
  at?: number;
  shouldCancelWhenOutside?: boolean;
  minDurationMs?: number;
  onActivated?: () => void;
  onEnded?: () => void;
  orientation?: 'horizontal' | 'vertical';
  persistOnEnd?: boolean;
};

export const CursorContext = React.createContext({ type: '' });

LineChartCursor.displayName = 'LineChartCursor';

export function LineChartCursor({
  children,
  snapToPoint,
  type,
  at,
  shouldCancelWhenOutside = false,
  persistOnEnd = false,
  minDurationMs = 0,
  onActivated,
  onEnded,
}: LineChartCursorProps) {
  const { pathWidth: width, parsedPath } = React.useContext(
    LineChartDimensionsContext
  );
  const { currentX, currentIndex, isActive, data, xDomain } = useLineChart();
  const xValues = React.useMemo(
    () => (data ?? []).map(({ timestamp }, i) => (xDomain ? timestamp : i)),
    [data, xDomain]
  );

  // Same scale as in /src/charts/line/utils/getPath.ts
  const scaleX = React.useMemo(() => {
    const domainArray = xDomain ?? [0, xValues.length];
    return scaleLinear().domain(domainArray).range([0, width]);
  }, [width, xDomain, xValues.length]);

  const linearScalePositionAndIndex = ({
    xPosition,
  }: {
    xPosition: number;
  }) => {
    if (!parsedPath) {
      return;
    }

    // Calculate a scaled timestamp for the current touch position
    const xRelative = scaleX.invert(xPosition);

    const closestIndex = bisectCenter(xValues, xRelative);
    const pathDataDelta = Math.abs(parsedPath.curves.length - xValues.length); // sometimes there is a difference between data length and number of path curves.
    const closestPathCurve = Math.max(
      Math.min(closestIndex, parsedPath.curves.length + 1) - pathDataDelta,
      0
    );

    const curveSegment =
      closestIndex > 0 && parsedPath.curves[closestPathCurve]
        ? parsedPath.curves[closestPathCurve]
        : null;
    const newXPosition = (curveSegment ? curveSegment.to : parsedPath.move).x;
    // Update values
    currentIndex.value = closestIndex;
    currentX.value = newXPosition;
  };

  useEffect(() => {
    if (at !== undefined) {
      const xPosition = scaleX(at);
      runOnJS(linearScalePositionAndIndex)({ xPosition });
      isActive.value = true;
    }
  }, [at, scaleX]);

  const updatePosition = (xPosition: number) => {
    'worklet';
    if (parsedPath) {
      // on Web, we could drag the cursor to be negative, breaking it
      // so we clamp the index at 0 to fix it
      // https://github.com/coinjar/react-native-wagmi-charts/issues/24
      const minIndex = 0;
      const boundedIndex = Math.max(
        minIndex,
        Math.round(xPosition / width / (1 / (data ? data.length - 1 : 1)))
      );

      if (snapToPoint) {
        // We have to run this on the JS thread unfortunately as the scaleLinear functions won't work on UI thread
        runOnJS(linearScalePositionAndIndex)({ xPosition });
      } else if (!snapToPoint) {
        currentX.value = xPosition;
        currentIndex.value = boundedIndex;
      }
    }
  };

  const longPressGesture = Gesture.LongPress()
    .minDuration(minDurationMs ?? 0)
    .maxDistance(999999)
    .shouldCancelWhenOutside(shouldCancelWhenOutside)
    .onStart(
      (event: GestureStateChangeEvent<LongPressGestureHandlerEventPayload>) => {
        'worklet';
        if (parsedPath) {
          const xPosition = Math.max(0, event.x <= width ? event.x : width);
          isActive.value = true;
          updatePosition(xPosition);

          if (onActivated) {
            runOnJS(onActivated)();
          }
        }
      }
    )
    .onTouchesMove((event) => {
      'worklet';
      if (
        parsedPath &&
        isActive.value &&
        event.allTouches.length > 0 &&
        event.allTouches[0]
      ) {
        const touchX = event.allTouches[0].x;
        const xPosition = Math.max(0, touchX <= width ? touchX : width);
        updatePosition(xPosition);
      }
    })
    .onEnd(() => {
      'worklet';

      if (!persistOnEnd) {
        isActive.value = false;
        currentIndex.value = -1;
      }

      if (onEnded) {
        runOnJS(onEnded)();
      }
    });

  return (
    <CursorContext.Provider value={{ type }}>
      <GestureDetector gesture={longPressGesture}>
        <Animated.View style={StyleSheet.absoluteFill}>
          {children}
        </Animated.View>
      </GestureDetector>
    </CursorContext.Provider>
  );
}
