"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CandlestickChartCrosshairTooltip = CandlestickChartCrosshairTooltip;
exports.CandlestickChartCrosshairTooltipContext = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _Chart = require("./Chart");

var _useCandlestickChart = require("./useCandlestickChart");

var _PriceText = require("./PriceText");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const CandlestickChartCrosshairTooltipContext = /*#__PURE__*/React.createContext({
  position: {
    value: 'left'
  }
});
exports.CandlestickChartCrosshairTooltipContext = CandlestickChartCrosshairTooltipContext;

function CandlestickChartCrosshairTooltip({
  children,
  xGutter = 8,
  yGutter = 8,
  tooltipTextProps,
  textStyle,
  ...props
}) {
  const {
    width,
    height
  } = React.useContext(_Chart.CandlestickChartDimensionsContext);
  const {
    currentY
  } = (0, _useCandlestickChart.useCandlestickChart)();
  const {
    position
  } = React.useContext(CandlestickChartCrosshairTooltipContext);
  const elementHeight = (0, _reactNativeReanimated.useSharedValue)(0);
  const elementWidth = (0, _reactNativeReanimated.useSharedValue)(0);
  const handleLayout = React.useCallback(event => {
    elementHeight.value = event.nativeEvent.layout.height;
    elementWidth.value = event.nativeEvent.layout.width;
  }, [elementHeight, elementWidth]);
  const topOffset = (0, _reactNativeReanimated.useDerivedValue)(() => {
    let offset = 0;

    if (currentY.value < elementHeight.value / 2 + yGutter) {
      offset = currentY.value - (elementHeight.value / 2 + yGutter);
    } else if (currentY.value + elementHeight.value / 2 > height - yGutter) {
      offset = currentY.value + elementHeight.value / 2 - height + yGutter;
    }

    return offset;
  });
  const tooltip = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    backgroundColor: 'white',
    position: 'absolute',
    display: 'flex',
    padding: 4
  }));
  const leftTooltip = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    left: xGutter,
    top: -(elementHeight.value / 2) - topOffset.value,
    opacity: position.value === 'left' ? 1 : 0
  }));
  const rightTooltip = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    left: width - elementWidth.value - xGutter,
    top: -(elementHeight.value / 2) - topOffset.value,
    opacity: position.value === 'right' ? 1 : 0
  }));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_reactNativeReanimated.default.View, _extends({
    onLayout: handleLayout
  }, props, {
    style: [tooltip, leftTooltip, props.style]
  }), children || /*#__PURE__*/React.createElement(_PriceText.CandlestickChartPriceText, _extends({}, tooltipTextProps, {
    style: [styles.text, tooltipTextProps === null || tooltipTextProps === void 0 ? void 0 : tooltipTextProps.style, textStyle]
  }))), /*#__PURE__*/React.createElement(_reactNativeReanimated.default.View, _extends({}, props, {
    style: [tooltip, rightTooltip, props.style]
  }), children || /*#__PURE__*/React.createElement(_PriceText.CandlestickChartPriceText, _extends({}, tooltipTextProps, {
    style: [styles.text, tooltipTextProps === null || tooltipTextProps === void 0 ? void 0 : tooltipTextProps.style, textStyle]
  }))));
}

const styles = _reactNative.StyleSheet.create({
  text: {
    fontSize: 14
  }
});
//# sourceMappingURL=CrosshairTooltip.js.map