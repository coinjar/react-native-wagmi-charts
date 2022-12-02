"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineChartHorizontalLine = LineChartHorizontalLine;

var _react = _interopRequireDefault(require("react"));

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _reactNativeSvg = require("react-native-svg");

var _reactNativeRedash = require("react-native-redash");

var _Chart = require("./Chart");

var _useLineChart = require("./useLineChart");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const AnimatedLine = _reactNativeReanimated.default.createAnimatedComponent(_reactNativeSvg.Line);

LineChartHorizontalLine.displayName = 'LineChartHorizontalLine';

function LineChartHorizontalLine({
  color = 'gray',
  lineProps = {},
  at = {
    index: 0
  },
  offsetY = 0
}) {
  const {
    width,
    path,
    height,
    gutter
  } = _react.default.useContext(_Chart.LineChartDimensionsContext);

  const {
    data,
    yDomain
  } = (0, _useLineChart.useLineChart)();

  const parsedPath = _react.default.useMemo(() => (0, _reactNativeRedash.parse)(path), [path]);

  const pointWidth = _react.default.useMemo(() => width / data.length, [data.length, width]);

  const y = (0, _reactNativeReanimated.useDerivedValue)(() => {
    if (typeof at === 'number' || at.index != null) {
      const index = typeof at === 'number' ? at : at.index;
      const yForX = (0, _reactNativeRedash.getYForX)(parsedPath, pointWidth * index) || 0;
      return (0, _reactNativeReanimated.withTiming)(yForX + offsetY);
    }
    /**
     * <gutter>
     * | ---------- | <- yDomain.max  |
     * |            |                 | offsetTop
     * |            | <- value        |
     * |            |
     * |            | <- yDomain.min
     * <gutter>
     */


    const offsetTop = yDomain.max - at.value;
    const percentageOffsetTop = offsetTop / (yDomain.max - yDomain.min);
    const heightBetweenGutters = height - gutter * 2;
    const offsetTopPixels = gutter + percentageOffsetTop * heightBetweenGutters;
    return (0, _reactNativeReanimated.withTiming)(offsetTopPixels + offsetY);
  });
  const lineAnimatedProps = (0, _reactNativeReanimated.useAnimatedProps)(() => ({
    x1: 0,
    x2: width,
    y1: y.value,
    y2: y.value
  }));
  return /*#__PURE__*/_react.default.createElement(AnimatedLine, _extends({
    animatedProps: lineAnimatedProps,
    strokeWidth: 2,
    stroke: color,
    strokeDasharray: "3 3"
  }, lineProps));
}
//# sourceMappingURL=HorizontalLine.js.map