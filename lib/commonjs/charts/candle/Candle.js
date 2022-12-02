"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CandlestickChartCandle = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _reactNativeSvg = require("react-native-svg");

var _utils = require("./utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const AnimatedRect = _reactNativeReanimated.default.createAnimatedComponent(_reactNativeSvg.Rect);

const AnimatedLine = _reactNativeReanimated.default.createAnimatedComponent(_reactNativeSvg.Line);

const CandlestickChartCandle = ({
  candle,
  maxHeight,
  domain,
  margin = 2,
  positiveColor = '#10b981',
  negativeColor = '#ef4444',
  rectProps: overrideRectProps,
  lineProps: overrideLineProps,
  index,
  width,
  useAnimations = true,
  renderLine = props => props.useAnimations ? /*#__PURE__*/_react.default.createElement(AnimatedLine, props) : /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Line, props),
  renderRect = props => props.useAnimations ? /*#__PURE__*/_react.default.createElement(AnimatedRect, props) : /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Rect, props)
}) => {
  const {
    close,
    open,
    high,
    low
  } = candle;
  const isPositive = close > open;
  const fill = isPositive ? positiveColor : negativeColor;
  const x = index * width;
  const max = Math.max(open, close);
  const min = Math.min(open, close);

  const lineProps = _react.default.useMemo(() => ({
    stroke: fill,
    strokeWidth: 1,
    direction: isPositive ? 'positive' : 'negative',
    x1: x + width / 2,
    y1: (0, _utils.getY)({
      maxHeight,
      value: low,
      domain
    }),
    x2: x + width / 2,
    y2: (0, _utils.getY)({
      maxHeight,
      value: high,
      domain
    }),
    ...overrideLineProps
  }), [domain, fill, high, isPositive, low, maxHeight, overrideLineProps, width, x]);

  const animatedLineProps = (0, _reactNativeReanimated.useAnimatedProps)(() => ({
    x1: (0, _reactNativeReanimated.withTiming)(x + width / 2),
    y1: (0, _reactNativeReanimated.withTiming)((0, _utils.getY)({
      maxHeight,
      value: low,
      domain
    })),
    x2: (0, _reactNativeReanimated.withTiming)(x + width / 2),
    y2: (0, _reactNativeReanimated.withTiming)((0, _utils.getY)({
      maxHeight,
      value: high,
      domain
    }))
  }));

  const rectProps = _react.default.useMemo(() => ({
    width: width - margin * 2,
    fill: fill,
    direction: isPositive ? 'positive' : 'negative',
    x: x + margin,
    y: (0, _utils.getY)({
      maxHeight,
      value: max,
      domain
    }),
    height: (0, _utils.getHeight)({
      maxHeight,
      value: max - min,
      domain
    }),
    ...overrideRectProps
  }), [domain, fill, isPositive, margin, max, maxHeight, min, overrideRectProps, width, x]);

  const animatedRectProps = (0, _reactNativeReanimated.useAnimatedProps)(() => ({
    x: (0, _reactNativeReanimated.withTiming)(x + margin),
    y: (0, _reactNativeReanimated.withTiming)((0, _utils.getY)({
      maxHeight,
      value: max,
      domain
    })),
    height: (0, _reactNativeReanimated.withTiming)((0, _utils.getHeight)({
      maxHeight,
      value: max - min,
      domain
    }))
  }));
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, renderLine({ ...lineProps,
    useAnimations,
    ...(useAnimations ? {
      animatedProps: animatedLineProps
    } : {})
  }), renderRect({ ...rectProps,
    useAnimations,
    ...(useAnimations ? {
      animatedProps: animatedRectProps
    } : {})
  }));
};

exports.CandlestickChartCandle = CandlestickChartCandle;
//# sourceMappingURL=Candle.js.map