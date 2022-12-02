function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { StyleSheet } from 'react-native';
import { LongPressGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useSharedValue, useAnimatedStyle, useAnimatedReaction, runOnJS } from 'react-native-reanimated';
import { clamp } from 'react-native-redash';
import { CandlestickChartDimensionsContext } from './Chart';
import { CandlestickChartLine } from './Line';
import { useCandlestickChart } from './useCandlestickChart';
import { CandlestickChartCrosshairTooltipContext } from './CrosshairTooltip';
export function CandlestickChartCrosshair({
  color,
  onCurrentXChange,
  children,
  horizontalCrosshairProps = {},
  verticalCrosshairProps = {},
  lineProps = {},
  ...props
}) {
  const {
    width,
    height
  } = React.useContext(CandlestickChartDimensionsContext);
  const {
    currentX,
    currentY,
    step
  } = useCandlestickChart();
  const tooltipPosition = useSharedValue('left');
  const opacity = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler({
    onActive: ({
      x,
      y
    }) => {
      const boundedX = x <= width - 1 ? x : width - 1;

      if (boundedX < 100) {
        tooltipPosition.value = 'right';
      } else {
        tooltipPosition.value = 'left';
      }

      opacity.value = 1;
      currentY.value = clamp(y, 0, height);
      currentX.value = boundedX - boundedX % step + step / 2;
    },
    onEnd: () => {
      opacity.value = 0;
      currentY.value = -1;
      currentX.value = -1;
    }
  });
  const horizontal = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{
      translateY: currentY.value
    }]
  }));
  const vertical = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{
      translateX: currentX.value
    }]
  }));
  useAnimatedReaction(() => currentX.value, (data, prevData) => {
    if (data !== -1 && data !== prevData && onCurrentXChange) {
      runOnJS(onCurrentXChange)(data);
    }
  });
  return /*#__PURE__*/React.createElement(LongPressGestureHandler, _extends({
    minDurationMs: 0,
    maxDist: 999999,
    onGestureEvent: onGestureEvent
  }, props), /*#__PURE__*/React.createElement(Animated.View, {
    style: StyleSheet.absoluteFill
  }, /*#__PURE__*/React.createElement(Animated.View, _extends({
    style: [StyleSheet.absoluteFill, horizontal]
  }, horizontalCrosshairProps), /*#__PURE__*/React.createElement(CandlestickChartLine, _extends({
    color: color,
    x: width,
    y: 0
  }, lineProps)), /*#__PURE__*/React.createElement(CandlestickChartCrosshairTooltipContext.Provider, {
    value: {
      position: tooltipPosition
    }
  }, children)), /*#__PURE__*/React.createElement(Animated.View, _extends({
    style: [StyleSheet.absoluteFill, vertical]
  }, verticalCrosshairProps), /*#__PURE__*/React.createElement(CandlestickChartLine, _extends({
    color: color,
    x: 0,
    y: height
  }, lineProps)))));
}
//# sourceMappingURL=Crosshair.js.map