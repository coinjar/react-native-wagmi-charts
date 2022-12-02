"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CandlestickChartProvider = CandlestickChartProvider;
exports.CandlestickChartContext = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNativeReanimated = require("react-native-reanimated");

var _utils = require("./utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const CandlestickChartContext = /*#__PURE__*/React.createContext({
  currentX: {
    value: -1
  },
  currentY: {
    value: -1
  },
  data: [],
  height: 0,
  width: 0,
  domain: [0, 0],
  step: 0,
  setWidth: () => undefined,
  setHeight: () => undefined
});
exports.CandlestickChartContext = CandlestickChartContext;

function CandlestickChartProvider({
  children,
  data = []
}) {
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const [step, setStep] = React.useState(0);
  const currentX = (0, _reactNativeReanimated.useSharedValue)(-1);
  const currentY = (0, _reactNativeReanimated.useSharedValue)(-1);
  const domain = React.useMemo(() => (0, _utils.getDomain)(data), [data]);
  React.useEffect(() => {
    if (data.length) {
      const newStep = width / data.length;
      setStep(newStep);
    }
  }, [data.length, width]);
  const contextValue = React.useMemo(() => ({
    currentX,
    currentY,
    data,
    width,
    height,
    domain,
    step,
    setWidth,
    setHeight,
    setStep
  }), [currentX, currentY, data, domain, height, step, width]);
  return /*#__PURE__*/React.createElement(CandlestickChartContext.Provider, {
    value: contextValue
  }, children);
}
//# sourceMappingURL=Context.js.map