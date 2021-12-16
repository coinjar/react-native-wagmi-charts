import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
  GestureEvent,
  LongPressGestureHandler,
  LongPressGestureHandlerEventPayload,
  LongPressGestureHandlerProps,
} from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler } from 'react-native-reanimated';
import { parse } from 'react-native-redash';

import { LineChartDimensionsContext } from './Chart';
import { useLineChart } from './useLineChart';

export type LineChartCursorProps = LongPressGestureHandlerProps & {
  children: React.ReactNode;
  type: 'line' | 'crosshair';
};

export const CursorContext = React.createContext({ type: '' });

LineChartCursor.displayName = 'LineChartCursor';

export function LineChartCursor({
  children,
  type,
  ...props
}: LineChartCursorProps) {
  const { pathWidth: width, path } = React.useContext(
    LineChartDimensionsContext
  );
  const { currentX, currentIndex, isActive, data } = useLineChart();

  const parsedPath = React.useMemo(
    () => (path ? parse(path) : undefined),
    [path]
  );

  const onGestureEvent = useAnimatedGestureHandler<
    GestureEvent<LongPressGestureHandlerEventPayload>
  >({
    onActive: ({ x }) => {
      if (parsedPath) {
        const boundedX = x <= width ? x : width;
        isActive.value = true;
        currentX.value = boundedX;

        // on Web, we could drag the cursor to be negative, breaking it
        // so we clamp the index at 0 to fix it
        // https://github.com/coinjar/react-native-wagmi-charts/issues/24
        const minIndex = 0;
        const boundedIndex = Math.max(
          minIndex,
          Math.round(boundedX / width / (1 / (data.length - 1)))
        );

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
