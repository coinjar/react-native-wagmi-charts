"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineChartCursorCrosshair = LineChartCursorCrosshair;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _Cursor = require("./Cursor");

var _useLineChart = require("./useLineChart");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

LineChartCursorCrosshair.displayName = 'LineChartCursorCrosshair';

function LineChartCursorCrosshair({
  children,
  color = 'black',
  size = 8,
  outerSize = 32,
  crosshairWrapperProps = {},
  crosshairProps = {},
  crosshairOuterProps = {},
  ...props
}) {
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
  return /*#__PURE__*/React.createElement(_Cursor.LineChartCursor, _extends({
    type: "crosshair"
  }, props), /*#__PURE__*/React.createElement(_reactNativeReanimated.default.View, _extends({}, crosshairWrapperProps, {
    style: [{
      width: outerSize,
      height: outerSize,
      alignItems: 'center',
      justifyContent: 'center'
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
  }))), children);
}
//# sourceMappingURL=CursorCrosshair.js.map