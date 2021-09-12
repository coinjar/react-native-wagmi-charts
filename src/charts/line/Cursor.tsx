import * as React from 'react';
import { StyleSheet } from 'react-native';
import { LongPressGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler } from 'react-native-reanimated';
import { getYForX, parse } from 'react-native-redash';

import { useLineChart } from './useLineChart';

type LineChartCursorProps = {
  children: React.ReactNode;
  type: 'line' | 'crosshair';
};

export const CursorContext = React.createContext({ type: '' });

export function LineChartCursor({ children, type }: LineChartCursorProps) {
  const { currentX, currentY, currentIndex, isActive, width, path, data } =
    useLineChart();

  const parsedPath = React.useMemo(() => parse(path), [path]);

  const onGestureEvent = useAnimatedGestureHandler({
    onActive: ({ x }) => {
      isActive.value = true;
      currentX.value = x;
      currentY.value = getYForX(parsedPath, x) || 0;
      currentIndex.value = Math.round(x / width / (1 / (data.length - 1)));
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
        onGestureEvent={onGestureEvent as any}
      >
        <Animated.View style={StyleSheet.absoluteFill}>
          {children}
        </Animated.View>
      </LongPressGestureHandler>
    </CursorContext.Provider>
  );
}
