"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CandlestickChartCandles = CandlestickChartCandles;

var React = _interopRequireWildcard(require("react"));

var _reactNativeSvg = require("react-native-svg");

var _Chart = require("./Chart");

var _Candle = require("./Candle");

var _useCandlestickChart = require("./useCandlestickChart");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function CandlestickChartCandles({
  positiveColor,
  negativeColor,
  rectProps,
  lineProps,
  margin,
  useAnimations = true,
  renderRect,
  renderLine,
  candleProps,
  ...props
}) {
  const {
    width,
    height
  } = React.useContext(_Chart.CandlestickChartDimensionsContext);
  const {
    data,
    domain,
    step
  } = (0, _useCandlestickChart.useCandlestickChart)(); ////////////////////////////////////////////////

  return /*#__PURE__*/React.createElement(_reactNativeSvg.Svg, _extends({
    width: width,
    height: height
  }, props), step > 0 && data.map((candle, index) => /*#__PURE__*/React.createElement(_Candle.CandlestickChartCandle, _extends({
    key: index,
    domain: domain,
    margin: margin,
    maxHeight: height,
    width: step,
    positiveColor: positiveColor,
    negativeColor: negativeColor,
    renderRect: renderRect,
    renderLine: renderLine,
    rectProps: rectProps,
    lineProps: lineProps,
    useAnimations: useAnimations,
    candle: candle,
    index: index
  }, candleProps))));
}
//# sourceMappingURL=Candles.js.map