import * as React from 'react';
import { StyleSheet } from 'react-native';
import { LongPressGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler } from 'react-native-reanimated';
import { getYForX, parse } from 'react-native-redash';

import { LineChartCursorLine } from './CursorLine';
import { LineChartCursorCrosshair } from './CursorCrosshair';
import { useLineChart } from './useLineChart';

type LineChartCursorProps = {
  color?: string;
  size?: number;
  wrapperSize?: number;
  type?: 'crosshair' | 'line';
};

export function LineChartCursor({
  color = 'black',
  size = 8,
  wrapperSize = 32,
  type = 'crosshair',
}: LineChartCursorProps) {
  const { currentX, currentY, isActive, height, path } = useLineChart();

  const parsedPath = React.useMemo(() => parse(path), [path]);

  const onGestureEvent = useAnimatedGestureHandler({
    onActive: ({ x }) => {
      isActive.value = true;
      currentX.value = x;
      currentY.value = getYForX(parsedPath, x) || 0;
    },
    onEnd: () => {
      isActive.value = false;
    },
  });

  return (
    <LongPressGestureHandler
      minDurationMs={0}
      onGestureEvent={onGestureEvent as any}
    >
      <Animated.View style={StyleSheet.absoluteFill}>
        {type === 'line' && (
          <LineChartCursorLine color={color} x={0} y={height} />
        )}
        {type === 'crosshair' && (
          <LineChartCursorCrosshair
            color={color}
            size={size}
            wrapperSize={wrapperSize}
          />
        )}
      </Animated.View>
    </LongPressGestureHandler>
  );
}
