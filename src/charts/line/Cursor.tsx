import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
  GestureEvent,
  LongPressGestureHandler,
  LongPressGestureHandlerEventPayload,
  LongPressGestureHandlerProps,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';

import { LineChartDimensionsContext } from './Chart';
import { useLineChart } from './useLineChart';
import { scaleLinear } from 'd3-scale';
import { bisectCenter } from 'd3-array';
import type { Path } from 'react-native-redash';

export type LineChartCursorProps = LongPressGestureHandlerProps & {
  children: React.ReactNode;
  type: 'line' | 'crosshair';
  snapToPoint?: boolean;
};

export const CursorContext = React.createContext({ type: '' });

LineChartCursor.displayName = 'LineChartCursor';

const linearScalePositionAndIndex = ({
  timestamps,
  width,
  xToUpdate,
  currentIndex,
  xPosition,
  path,
  xDomain,
}: {
  timestamps: number[];
  width: number;
  xToUpdate: Animated.SharedValue<number>;
  currentIndex: Animated.SharedValue<number>;
  xPosition: number;
  path: Path | undefined;
  xDomain: [number, number] | undefined;
}) => {
  if (!path) {
    return;
  }

  const domainArray = xDomain ?? [0, timestamps.length];

  // Same scale as in /src/charts/line/utils/getPath.ts
  const scaleX = scaleLinear().domain(domainArray).range([0, width]);

  // Calculate a scaled timestamp for the current touch position
  const xRelative = scaleX.invert(xPosition);

  const closestIndex = bisectCenter(timestamps, xRelative);
  const pathDataDelta = Math.abs(path.curves.length - timestamps.length); // sometimes there is a difference between data length and number of path curves.
  const closestPathCurve = Math.max(
    Math.min(bisectCenter(timestamps, xRelative), path.curves.length + 1) -
      pathDataDelta,
    0
  );

  const p0 = (closestIndex > 0 ? path.curves[closestPathCurve].to : path.move)
    .x;
  // Update values
  currentIndex.value = closestIndex;
  xToUpdate.value = p0;
};

export function LineChartCursor({
  children,
  snapToPoint,
  type,
  ...props
}: LineChartCursorProps) {
  const { pathWidth: width, parsedPath } = React.useContext(
    LineChartDimensionsContext
  );
  const { currentX, currentIndex, isActive, data, xDomain } = useLineChart();

  const onGestureEvent = useAnimatedGestureHandler<
    GestureEvent<LongPressGestureHandlerEventPayload>
  >({
    onActive: ({ x }) => {
      if (parsedPath) {
        const boundedX = Math.max(0, x <= width ? x : width);
        isActive.value = true;
        const xValues = data.map(({ timestamp }, i) =>
          xDomain ? timestamp : i
        );

        // on Web, we could drag the cursor to be negative, breaking it
        // so we clamp the index at 0 to fix it
        // https://github.com/coinjar/react-native-wagmi-charts/issues/24
        const minIndex = 0;
        const boundedIndex = Math.max(
          minIndex,
          Math.round(boundedX / width / (1 / (data.length - 1)))
        );

        if (snapToPoint) {
          // We have to run this on the JS thread unfortunately as the scaleLinear functions won't work on UI thread
          runOnJS(linearScalePositionAndIndex)({
            timestamps: xValues,
            width,
            xToUpdate: currentX,
            currentIndex,
            xPosition: boundedX,
            path: parsedPath,
            xDomain,
          });
        } else if (!snapToPoint) {
          currentX.value = boundedX;
          currentIndex.value = boundedIndex;
        }
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
        shouldCancelWhenOutside={false}
        {...props}
      >
        <Animated.View style={StyleSheet.absoluteFill}>
          {children}
        </Animated.View>
      </LongPressGestureHandler>
    </CursorContext.Provider>
  );
}
