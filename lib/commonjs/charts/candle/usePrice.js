"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCandlestickChartPrice = useCandlestickChartPrice;

var _reactNativeReanimated = require("react-native-reanimated");

var _utils = require("../../utils");

var _useCandlestickChart = require("./useCandlestickChart");

var _utils2 = require("./utils");

var _useCandleData = require("./useCandleData");

function useCandlestickChartPrice({
  format,
  precision = 2,
  type = 'crosshair'
} = {}) {
  const {
    currentY,
    domain,
    height
  } = (0, _useCandlestickChart.useCandlestickChart)();
  const candle = (0, _useCandleData.useCandleData)();
  const float = (0, _reactNativeReanimated.useDerivedValue)(() => {
    let price = 0;

    if (type === 'crosshair') {
      price = (0, _utils2.getPrice)({
        y: currentY.value,
        domain: [Math.min(...domain), Math.max(...domain)],
        maxHeight: height
      });
    } else {
      price = candle.value[type];
    }

    if (price === -1) return '';
    return price.toFixed(precision).toString();
  });
  const formatted = (0, _reactNativeReanimated.useDerivedValue)(() => {
    if (!float.value) return '';
    const formattedPrice = (0, _utils.formatPrice)({
      value: float.value
    });
    return format ? format({
      value: float.value,
      formatted: formattedPrice
    }) : formattedPrice;
  });
  return {
    value: float,
    formatted
  };
}
//# sourceMappingURL=usePrice.js.map