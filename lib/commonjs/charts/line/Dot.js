"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineChartDot = LineChartDot;

var React = _interopRequireWildcard(require("react"));

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _reactNativeSvg = require("react-native-svg");

var _reactNativeRedash = require("react-native-redash");

var _Chart = require("./Chart");

var _ChartPath = require("./ChartPath");

var _useLineChart = require("./useLineChart");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const AnimatedCircle = _reactNativeReanimated.default.createAnimatedComponent(_reactNativeSvg.Circle);

LineChartDot.displayName = 'LineChartDot';

function LineChartDot({
  at,
  color: defaultColor = 'black',
  dotProps,
  hasOuterDot: defaultHasOuterDot = false,
  hasPulse = false,
  inactiveColor,
  outerDotProps,
  pulseBehaviour = 'while-inactive',
  pulseDurationMs = 800,
  showInactiveColor = true,
  size = 4,
  outerSize = size * 4
}) {
  const {
    data,
    isActive
  } = (0, _useLineChart.useLineChart)();
  const {
    path,
    pathWidth: width
  } = React.useContext(_Chart.LineChartDimensionsContext); ////////////////////////////////////////////////////////////

  const {
    isInactive: _isInactive
  } = React.useContext(_ChartPath.LineChartPathContext);
  const isInactive = showInactiveColor && _isInactive;
  const color = isInactive ? inactiveColor || defaultColor : defaultColor;
  const opacity = isInactive && !inactiveColor ? 0.5 : 1;
  const hasOuterDot = defaultHasOuterDot || hasPulse; ////////////////////////////////////////////////////////////

  const parsedPath = React.useMemo(() => (0, _reactNativeRedash.parse)(path), [path]); ////////////////////////////////////////////////////////////

  const pointWidth = React.useMemo(() => width / (data.length - 1), [data.length, width]); ////////////////////////////////////////////////////////////

  const x = (0, _reactNativeReanimated.useDerivedValue)(() => (0, _reactNativeReanimated.withTiming)(pointWidth * at));
  const y = (0, _reactNativeReanimated.useDerivedValue)(() => (0, _reactNativeReanimated.withTiming)((0, _reactNativeRedash.getYForX)(parsedPath, x.value) || 0)); ////////////////////////////////////////////////////////////

  const animatedDotProps = (0, _reactNativeReanimated.useAnimatedProps)(() => ({
    cx: x.value,
    cy: y.value
  }));
  const animatedOuterDotProps = (0, _reactNativeReanimated.useAnimatedProps)(() => {
    let defaultProps = {
      cx: x.value,
      cy: y.value,
      opacity: 0.1,
      r: outerSize
    };

    if (!hasPulse) {
      return defaultProps;
    }

    if (isActive.value && pulseBehaviour === 'while-inactive') {
      return { ...defaultProps,
        r: 0
      };
    }

    const easing = _reactNativeReanimated.Easing.out(_reactNativeReanimated.Easing.sin);

    const animatedOpacity = (0, _reactNativeReanimated.withRepeat)((0, _reactNativeReanimated.withSequence)((0, _reactNativeReanimated.withTiming)(0.8), (0, _reactNativeReanimated.withTiming)(0, {
      duration: pulseDurationMs,
      easing
    })), -1, false);
    const scale = (0, _reactNativeReanimated.withRepeat)((0, _reactNativeReanimated.withSequence)((0, _reactNativeReanimated.withTiming)(0), (0, _reactNativeReanimated.withTiming)(outerSize, {
      duration: pulseDurationMs,
      easing
    })), -1, false);

    if (pulseBehaviour === 'while-inactive') {
      return { ...defaultProps,
        opacity: isActive.value ? (0, _reactNativeReanimated.withTiming)(0) : animatedOpacity,
        r: isActive.value ? (0, _reactNativeReanimated.withTiming)(0) : scale
      };
    }

    return { ...defaultProps,
      opacity: animatedOpacity,
      r: scale
    };
  }, [outerSize]); ////////////////////////////////////////////////////////////

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AnimatedCircle, _extends({
    animatedProps: animatedDotProps,
    r: size,
    fill: color,
    opacity: opacity
  }, dotProps)), hasOuterDot && /*#__PURE__*/React.createElement(AnimatedCircle, _extends({
    animatedProps: animatedOuterDotProps,
    fill: color
  }, outerDotProps)));
}
//# sourceMappingURL=Dot.js.map