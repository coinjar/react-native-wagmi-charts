import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
  GestureEvent,
  LongPressGestureHandler,
  LongPressGestureHandlerEventPayload,
  LongPressGestureHandlerProps,
} from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler } from 'react-native-reanimated';

import { LineChartDimensionsContext } from './Chart';
import { useLineChart } from './useLineChart';

export type LineChartCursorProps = LongPressGestureHandlerProps & {
  children: React.ReactNode;
  type: 'line' | 'crosshair';
  snapToPoint?: boolean;
};

export const CursorContext = React.createContext({ type: '' });

LineChartCursor.displayName = 'LineChartCursor';

export function LineChartCursor({
  children,
  snapToPoint,
  type,
  ...props
}: LineChartCursorProps) {
  const { pathWidth: width, parsedPath } = React.useContext(
    LineChartDimensionsContext
  );
  const { currentX, currentIndex, isActive, data } = useLineChart();

  const onGestureEvent = useAnimatedGestureHandler<
    GestureEvent<LongPressGestureHandlerEventPayload>
  >({
    onActive: ({ x }) => {
      if (parsedPath) {
        const boundedX = Math.max(0, x <= width ? x : width);
        isActive.value = true;

        // on Web, we could drag the cursor to be negative, breaking it
        // so we clamp the index at 0 to fix it
        // https://github.com/coinjar/react-native-wagmi-charts/issues/24
        const minIndex = 0;
        const boundedIndex = Math.max(
          minIndex,
          Math.round(boundedX / width / (1 / (data.length - 1)))
        );

        if (currentIndex.value !== boundedIndex && snapToPoint) {
          const currentIndexCurve = parsedPath.curves[boundedIndex];

          // We need to ensure we snap to the correct point on the path.
          let resX
          if (currentIndexCurve) {
            const p0 = (boundedIndex > 0 ? parsedPath.curves[boundedIndex - 1].to : parsedPath.move).x
            resX = p0
          } else {
            resX = parsedPath.curves[parsedPath.curves.length - 1].to.x
          }

          currentX.value = resX;

        } else if (!snapToPoint) {
          currentX.value = boundedX;
        }

        currentIndex.value = boundedIndex;
      }
    },
    onEnd: () => {
      isActive.value = false;
      currentIndex.value = -1;
    },
  });

  return (
    <CursorContext.Provider value={{ type }}>
      <LongPressGestureHandler
        minDurationMs={0}
        maxDist={999999}
        onGestureEvent={onGestureEvent}
        {...props}
      >
        <Animated.View style={StyleSheet.absoluteFill}>
          {children}
        </Animated.View>
      </LongPressGestureHandler>
    </CursorContext.Provider>
  );
}
