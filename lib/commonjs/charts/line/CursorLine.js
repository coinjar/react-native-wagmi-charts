"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineChartCursorLine = LineChartCursorLine;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));

var _Chart = require("./Chart");

var _Cursor = require("./Cursor");

var _useLineChart = require("./useLineChart");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

LineChartCursorLine.displayName = 'LineChartCursorLine';

function LineChartCursorLine({
  children,
  color = 'gray',
  lineProps = {}
}) {
  const {
    height
  } = _react.default.useContext(_Chart.LineChartDimensionsContext);

  const {
    currentX,
    isActive
  } = (0, _useLineChart.useLineChart)();
  const vertical = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    opacity: isActive.value ? 1 : 0,
    height: '100%',
    transform: [{
      translateX: currentX.value
    }]
  }));
  return /*#__PURE__*/_react.default.createElement(_Cursor.LineChartCursor, {
    type: "line"
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: vertical
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.default, {
    style: styles.svg
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Line, _extends({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: height,
    strokeWidth: 2,
    stroke: color,
    strokeDasharray: "3 3"
  }, lineProps)))), children);
}

const styles = _reactNative.StyleSheet.create({
  svg: { ..._reactNative.StyleSheet.absoluteFillObject,
    // height: 100% is required for <svg /> on web
    height: '100%'
  }
});
//# sourceMappingURL=CursorLine.js.map