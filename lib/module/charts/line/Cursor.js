function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { StyleSheet } from 'react-native';
import { LongPressGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler } from 'react-native-reanimated';
import { parse } from 'react-native-redash';
import { LineChartDimensionsContext } from './Chart';
import { useLineChart } from './useLineChart';
export const CursorContext = /*#__PURE__*/React.createContext({
  type: ''
});
LineChartCursor.displayName = 'LineChartCursor';
export function LineChartCursor({
  children,
  type,
  ...props
}) {
  const {
    pathWidth: width,
    path
  } = React.useContext(LineChartDimensionsContext);
  const {
    currentX,
    currentIndex,
    isActive,
    data
  } = useLineChart();
  const parsedPath = React.useMemo(() => path ? parse(path) : undefined, [path]);
  const onGestureEvent = useAnimatedGestureHandler({
    onActive: ({
      x
    }) => {
      if (parsedPath) {
        const boundedX = Math.max(0, x <= width ? x : width);
        isActive.value = true;
        currentX.value = boundedX; // on Web, we could drag the cursor to be negative, breaking it
        // so we clamp the index at 0 to fix it
        // https://github.com/coinjar/react-native-wagmi-charts/issues/24

        const minIndex = 0;
        const boundedIndex = Math.max(minIndex, Math.round(boundedX / width / (1 / (data.length - 1))));
        currentIndex.value = boundedIndex;
      }
    },
    onEnd: () => {
      isActive.value = false;
      currentIndex.value = -1;
    },
    onCancel: () => {
      isActive.value = false;
      currentIndex.value = -1;
    }
  });
  return /*#__PURE__*/React.createElement(CursorContext.Provider, {
    value: {
      type
    }
  }, /*#__PURE__*/React.createElement(LongPressGestureHandler, _extends({
    minDurationMs: 0,
    maxDist: 999999,
    onGestureEvent: onGestureEvent
  }, props), /*#__PURE__*/React.createElement(Animated.View, {
    style: StyleSheet.absoluteFill
  }, children)));
}
//# sourceMappingURL=Cursor.js.map