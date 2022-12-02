"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CandlestickChart = CandlestickChart;
exports.CandlestickChartDimensionsContext = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _useCandlestickChart = require("./useCandlestickChart");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const CandlestickChartDimensionsContext = /*#__PURE__*/React.createContext({
  width: 0,
  height: 0
});
exports.CandlestickChartDimensionsContext = CandlestickChartDimensionsContext;

const {
  width: screenWidth
} = _reactNative.Dimensions.get('window');

function CandlestickChart({
  children,
  width = screenWidth,
  height = screenWidth,
  ...props
}) {
  const {
    setWidth,
    setHeight
  } = (0, _useCandlestickChart.useCandlestickChart)();
  React.useEffect(() => {
    setWidth(width);
    setHeight(height);
  }, [height, setHeight, setWidth, width]);
  const contextValue = React.useMemo(() => ({
    width,
    height
  }), [height, width]);
  return /*#__PURE__*/React.createElement(CandlestickChartDimensionsContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(_reactNative.View, props, children));
}
//# sourceMappingURL=Chart.js.map