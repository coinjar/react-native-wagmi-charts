"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CandlestickChartCrosshair = CandlestickChartCrosshair;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeGestureHandler = require("react-native-gesture-handler");

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _reactNativeRedash = require("react-native-redash");

var _Chart = require("./Chart");

var _Line = require("./Line");

var _useCandlestickChart = require("./useCandlestickChart");

var _CrosshairTooltip = require("./CrosshairTooltip");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function CandlestickChartCrosshair({
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
  } = React.useContext(_Chart.CandlestickChartDimensionsContext);
  const {
    currentX,
    currentY,
    step
  } = (0, _useCandlestickChart.useCandlestickChart)();
  const tooltipPosition = (0, _reactNativeReanimated.useSharedValue)('left');
  const opacity = (0, _reactNativeReanimated.useSharedValue)(0);
  const onGestureEvent = (0, _reactNativeReanimated.useAnimatedGestureHandler)({
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
      currentY.value = (0, _reactNativeRedash.clamp)(y, 0, height);
      currentX.value = boundedX - boundedX % step + step / 2;
    },
    onEnd: () => {
      opacity.value = 0;
      currentY.value = -1;
      currentX.value = -1;
    }
  });
  const horizontal = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    opacity: opacity.value,
    transform: [{
      translateY: currentY.value
    }]
  }));
  const vertical = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    opacity: opacity.value,
    transform: [{
      translateX: currentX.value
    }]
  }));
  (0, _reactNativeReanimated.useAnimatedReaction)(() => currentX.value, (data, prevData) => {
    if (data !== -1 && data !== prevData && onCurrentXChange) {
      (0, _reactNativeReanimated.runOnJS)(onCurrentXChange)(data);
    }
  });
  return /*#__PURE__*/React.createElement(_reactNativeGestureHandler.LongPressGestureHandler, _extends({
    minDurationMs: 0,
    maxDist: 999999,
    onGestureEvent: onGestureEvent
  }, props), /*#__PURE__*/React.createElement(_reactNativeReanimated.default.View, {
    style: _reactNative.StyleSheet.absoluteFill
  }, /*#__PURE__*/React.createElement(_reactNativeReanimated.default.View, _extends({
    style: [_reactNative.StyleSheet.absoluteFill, horizontal]
  }, horizontalCrosshairProps), /*#__PURE__*/React.createElement(_Line.CandlestickChartLine, _extends({
    color: color,
    x: width,
    y: 0
  }, lineProps)), /*#__PURE__*/React.createElement(_CrosshairTooltip.CandlestickChartCrosshairTooltipContext.Provider, {
    value: {
      position: tooltipPosition
    }
  }, children)), /*#__PURE__*/React.createElement(_reactNativeReanimated.default.View, _extends({
    style: [_reactNative.StyleSheet.absoluteFill, vertical]
  }, verticalCrosshairProps), /*#__PURE__*/React.createElement(_Line.CandlestickChartLine, _extends({
    color: color,
    x: 0,
    y: height
  }, lineProps)))));
}
//# sourceMappingURL=Crosshair.js.map