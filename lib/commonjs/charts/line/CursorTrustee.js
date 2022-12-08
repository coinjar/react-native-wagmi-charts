"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineChartCursorTrustee = LineChartCursorTrustee;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));

var _Cursor = require("./Cursor");

var _Chart = require("./Chart");

var _useLineChart = require("./useLineChart");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

LineChartCursorTrustee.displayName = 'LineChartCursorTrustee';

const AnimatedSvgLine = _reactNativeReanimated.default.createAnimatedComponent(_reactNativeSvg.Line);

function LineChartCursorTrustee({
  children,
  color = 'black',
  horizontalLineColor = 'green',
  verticalLineColor = 'orange',
  size = 8,
  outerSize = 32,
  crosshairWrapperProps = {},
  crosshairProps = {},
  crosshairOuterProps = {},
  lineVerticalProps = {},
  lineHorizontalProps = {},
  ...props
}) {
  const {
    height,
    width
  } = React.useContext(_Chart.LineChartDimensionsContext);
  const {
    currentX,
    currentY,
    isActive
  } = (0, _useLineChart.useLineChart)(); // It seems that enabling spring animation on initial render on Android causes a crash.

  const [enableSpringAnimation, setEnableSpringAnimation] = React.useState(_reactNative.Platform.OS === 'ios');
  React.useEffect(() => {
    setTimeout(() => {
      setEnableSpringAnimation(true);
    }, 100);
  }, []);
  const animatedCursorStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    transform: [{
      translateX: currentX.value - outerSize / 2
    }, {
      translateY: currentY.value - outerSize / 2
    }, {
      scale: enableSpringAnimation ? (0, _reactNativeReanimated.withSpring)(isActive.value ? 1 : 0, {
        damping: 10
      }) : 0
    }]
  }));
  const horizontal = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    opacity: isActive.value ? 1 : 0,
    transform: [{
      translateY: currentY.value
    }]
  }));
  const vertical = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    opacity: isActive.value ? 1 : 0,
    transform: [{
      translateX: currentX.value
    }]
  }));
  const vertical2 = (0, _reactNativeReanimated.useAnimatedProps)(() => ({
    y1: currentY.value || 0
  }));
  return /*#__PURE__*/React.createElement(_Cursor.LineChartCursor, _extends({
    type: "trustee"
  }, props), /*#__PURE__*/React.createElement(_reactNativeReanimated.default.View, _extends({}, crosshairWrapperProps, {
    style: [{
      width: outerSize,
      height: outerSize,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 5
    }, animatedCursorStyle, crosshairWrapperProps.style]
  }), /*#__PURE__*/React.createElement(_reactNative.View, _extends({}, crosshairOuterProps, {
    style: [{
      backgroundColor: color,
      width: outerSize,
      height: outerSize,
      borderRadius: outerSize,
      opacity: 0.1,
      position: 'absolute'
    }, crosshairOuterProps.style]
  })), /*#__PURE__*/React.createElement(_reactNative.View, _extends({}, crosshairProps, {
    style: [{
      backgroundColor: color,
      width: size,
      height: size,
      borderRadius: size
    }, crosshairProps.style]
  }))), /*#__PURE__*/React.createElement(_reactNativeReanimated.default.View, {
    style: [horizontal, { ..._reactNative.StyleSheet.absoluteFillObject,
      width: width
    }]
  }, /*#__PURE__*/React.createElement(_reactNativeSvg.default, null, /*#__PURE__*/React.createElement(_reactNativeSvg.Line, _extends({
    x1: 0,
    y1: 0,
    x2: width,
    y2: 0,
    strokeWidth: 2,
    stroke: horizontalLineColor
  }, lineHorizontalProps)))), /*#__PURE__*/React.createElement(_reactNativeReanimated.default.View, {
    style: [vertical, { ..._reactNative.StyleSheet.absoluteFillObject
    }]
  }, /*#__PURE__*/React.createElement(_reactNativeSvg.default, null, /*#__PURE__*/React.createElement(AnimatedSvgLine, _extends({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: height,
    strokeWidth: 2,
    stroke: verticalLineColor,
    animatedProps: vertical2
  }, lineVerticalProps)))), children);
}
//# sourceMappingURL=CursorTrustee.js.map