"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineChartProvider = LineChartProvider;
exports.LineChartContext = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNativeReanimated = require("react-native-reanimated");

var _Data = require("./Data");

var _utils = require("./utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const LineChartContext = /*#__PURE__*/React.createContext({
  currentX: {
    value: -1
  },
  currentIndex: {
    value: -1
  },
  domain: [0, 0],
  isActive: {
    value: false
  },
  yDomain: {
    min: 0,
    max: 0
  },
  xLength: 0
});
exports.LineChartContext = LineChartContext;
LineChartProvider.displayName = 'LineChartProvider';

function LineChartProvider({
  children,
  data = [],
  yRange,
  onCurrentIndexChange,
  xLength
}) {
  const currentX = (0, _reactNativeReanimated.useSharedValue)(-1);
  const currentIndex = (0, _reactNativeReanimated.useSharedValue)(-1);
  const isActive = (0, _reactNativeReanimated.useSharedValue)(false);
  const domain = React.useMemo(() => (0, _utils.getDomain)(Array.isArray(data) ? data : Object.values(data)[0]), [data]);
  const contextValue = React.useMemo(() => {
    var _yRange$min, _yRange$max;

    const values = (0, _utils.lineChartDataPropToArray)(data).map(({
      value
    }) => value);
    return {
      currentX,
      currentIndex,
      isActive,
      domain,
      yDomain: {
        min: (_yRange$min = yRange === null || yRange === void 0 ? void 0 : yRange.min) !== null && _yRange$min !== void 0 ? _yRange$min : Math.min(...values),
        max: (_yRange$max = yRange === null || yRange === void 0 ? void 0 : yRange.max) !== null && _yRange$max !== void 0 ? _yRange$max : Math.max(...values)
      },
      xLength: xLength !== null && xLength !== void 0 ? xLength : (Array.isArray(data) ? data : Object.values(data)[0]).length
    };
  }, [currentIndex, currentX, data, domain, isActive, yRange === null || yRange === void 0 ? void 0 : yRange.max, yRange === null || yRange === void 0 ? void 0 : yRange.min, xLength]);
  (0, _reactNativeReanimated.useAnimatedReaction)(() => currentIndex.value, (x, prevX) => {
    if (x !== -1 && x !== prevX && onCurrentIndexChange) {
      (0, _reactNativeReanimated.runOnJS)(onCurrentIndexChange)(x);
    }
  });
  return /*#__PURE__*/React.createElement(_Data.LineChartDataProvider, {
    data: data
  }, /*#__PURE__*/React.createElement(LineChartContext.Provider, {
    value: contextValue
  }, children));
}
//# sourceMappingURL=Context.js.map