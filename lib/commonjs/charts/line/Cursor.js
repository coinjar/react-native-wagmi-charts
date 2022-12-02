"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineChartCursor = LineChartCursor;
exports.CursorContext = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeGestureHandler = require("react-native-gesture-handler");

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _reactNativeRedash = require("react-native-redash");

var _Chart = require("./Chart");

var _useLineChart = require("./useLineChart");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const CursorContext = /*#__PURE__*/React.createContext({
  type: ''
});
exports.CursorContext = CursorContext;
LineChartCursor.displayName = 'LineChartCursor';

function LineChartCursor({
  children,
  type,
  ...props
}) {
  const {
    pathWidth: width,
    path
  } = React.useContext(_Chart.LineChartDimensionsContext);
  const {
    currentX,
    currentIndex,
    isActive,
    data
  } = (0, _useLineChart.useLineChart)();
  const parsedPath = React.useMemo(() => path ? (0, _reactNativeRedash.parse)(path) : undefined, [path]);
  const onGestureEvent = (0, _reactNativeReanimated.useAnimatedGestureHandler)({
    onActive: ({
      x
    }) => {
      if (parsedPath) {
        const boundedX = Math.max(0, x <= width ? x : width);
        isActive.value = true;
        currentX.value = boundedX; // on Web, we could drag the cursor to be negative, breaking it
        // so we clamp the index at 0 to fix it
        // https://github.com/coinjar/react-native-wagmi-charts/issues/24

        const minIndex = 0;
        const boundedIndex = Math.max(minIndex, Math.round(boundedX / width / (1 / (data.length - 1))));
        currentIndex.value = boundedIndex;
      }
    },
    onEnd: () => {
      isActive.value = false;
      currentIndex.value = -1;
    }
  });
  return /*#__PURE__*/React.createElement(CursorContext.Provider, {
    value: {
      type
    }
  }, /*#__PURE__*/React.createElement(_reactNativeGestureHandler.LongPressGestureHandler, _extends({
    minDurationMs: 0,
    maxDist: 999999,
    onGestureEvent: onGestureEvent
  }, props), /*#__PURE__*/React.createElement(_reactNativeReanimated.default.View, {
    style: _reactNative.StyleSheet.absoluteFill
  }, children)));
}
//# sourceMappingURL=Cursor.js.map