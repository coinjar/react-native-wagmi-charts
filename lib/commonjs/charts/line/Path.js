"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineChartPath = LineChartPath;

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

LineChartPath.displayName = 'LineChartPath';

function LineChartPath({
  color = 'black',
  inactiveColor,
  width: strokeWidth = 3,
  ...props
}) {
  const {
    path
  } = React.useContext(_Chart.LineChartDimensionsContext);
  const {
    isTransitionEnabled,
    isInactive
  } = React.useContext(_ChartPath.LineChartPathContext); ////////////////////////////////////////////////

  const {
    animatedProps
  } = (0, _useAnimatedPath.default)({
    enabled: isTransitionEnabled,
    path
  }); ////////////////////////////////////////////////

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AnimatedPath, _extends({
    animatedProps: animatedProps,
    fill: "transparent",
    stroke: isInactive ? inactiveColor || color : color,
    strokeOpacity: isInactive && !inactiveColor ? 0.2 : 1,
    strokeWidth: strokeWidth
  }, props)));
}
//# sourceMappingURL=Path.js.map