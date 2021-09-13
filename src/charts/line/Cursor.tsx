import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
  LongPressGestureHandler,
  LongPressGestureHandlerProps,
} from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler } from 'react-native-reanimated';
import { getYForX, parse } from 'react-native-redash';

import { LineChartDimensionsContext } from './Chart';
import { useLineChart } from './useLineChart';

type LineChartCursorProps = LongPressGestureHandlerProps & {
  children: React.ReactNode;
  type: 'line' | 'crosshair';
};

export const CursorContext = React.createContext({ type: '' });

export function LineChartCursor({
  children,
  type,
  ...props
}: LineChartCursorProps) {
  const { width, path } = React.useContext(LineChartDimensionsContext);
  const { currentX, currentY, currentIndex, isActive, data } = useLineChart();

  const parsedPath = React.useMemo(() => parse(path), [path]);

  const onGestureEvent = useAnimatedGestureHandler({
    onActive: ({ x }) => {
      const boundedX = x <= width ? x : width;
      isActive.value = true;
      currentX.value = boundedX;
      currentY.value = getYForX(parsedPath, boundedX) || 0;
      currentIndex.value = Math.round(
        boundedX / width / (1 / (data.length - 1))
      );
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
        {...props}
      >
        <Animated.View style={StyleSheet.absoluteFill}>
          {children}
        </Animated.View>
      </LongPressGestureHandler>
    </CursorContext.Provider>
  );
}
