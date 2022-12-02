"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineChartGradient = LineChartGradient;

var React = _interopRequireWildcard(require("react"));

var _reactNativeReanimated = _interopRequireDefault(require("react-native-reanimated"));

var _reactNativeSvg = require("react-native-svg");

var _Chart = require("./Chart");

var _ChartPath = require("./ChartPath");

var _useAnimatedPath = _interopRequireDefault(require("./useAnimatedPath"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const AnimatedPath = _reactNativeReanimated.default.createAnimatedComponent(_reactNativeSvg.Path);

let id = 0;
LineChartGradient.displayName = 'LineChartGradient';

function LineChartGradient({
  color: overrideColor = undefined,
  children,
  ...props
}) {
  const {
    area
  } = React.useContext(_Chart.LineChartDimensionsContext);
  const {
    color: contextColor,
    isTransitionEnabled
  } = React.useContext(_ChartPath.LineChartPathContext);
  const color = overrideColor || contextColor; ////////////////////////////////////////////////

  const {
    animatedProps
  } = (0, _useAnimatedPath.default)({
    enabled: isTransitionEnabled,
    path: area
  }); ////////////////////////////////////////////////

  const localId = React.useRef(++id); ////////////////////////////////////////////////

  return /*#__PURE__*/React.createElement(React.Fragment, null, children ? /*#__PURE__*/React.createElement(_reactNativeSvg.Defs, null, /*#__PURE__*/React.createElement(_reactNativeSvg.LinearGradient, {
    id: `${localId.current}`,
    x1: "0",
    x2: "0",
    y1: "0",
    y2: "100%"
  }, children)) : /*#__PURE__*/React.createElement(_reactNativeSvg.Defs, null, /*#__PURE__*/React.createElement(_reactNativeSvg.LinearGradient, {
    id: `${localId.current}`,
    x1: "0",
    x2: "0",
    y1: "0",
    y2: "100%"
  }, /*#__PURE__*/React.createElement(_reactNativeSvg.Stop, {
    offset: "20%",
    stopColor: color,
    stopOpacity: 0.15
  }), /*#__PURE__*/React.createElement(_reactNativeSvg.Stop, {
    offset: "40%",
    stopColor: color,
    stopOpacity: 0.05
  }), /*#__PURE__*/React.createElement(_reactNativeSvg.Stop, {
    offset: "100%",
    stopColor: color,
    stopOpacity: 0
  }))), /*#__PURE__*/React.createElement(AnimatedPath, _extends({
    animatedProps: animatedProps,
    fill: `url(#${localId.current})`
  }, props)));
}
//# sourceMappingURL=Gradient.js.map