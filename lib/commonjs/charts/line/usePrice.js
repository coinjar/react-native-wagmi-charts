"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLineChartPrice = useLineChartPrice;

var _reactNativeReanimated = require("react-native-reanimated");

var _utils = require("../../utils");

var _useLineChart = require("./useLineChart");

function useLineChartPrice({
  format,
  precision = 2
} = {}) {
  const {
    currentIndex,
    data
  } = (0, _useLineChart.useLineChart)();
  const float = (0, _reactNativeReanimated.useDerivedValue)(() => {
    if (typeof currentIndex.value === 'undefined' || currentIndex.value === -1) return '';
    let price = 0;
    price = data[currentIndex.value].value;
    return price.toFixed(precision).toString();
  });
  const formatted = (0, _reactNativeReanimated.useDerivedValue)(() => {
    let value = float.value || '';
    const formattedPrice = value ? (0, _utils.formatPrice)({
      value
    }) : '';
    return format ? format({
      value,
      formatted: formattedPrice
    }) : formattedPrice;
  });
  return {
    value: float,
    formatted
  };
}
//# sourceMappingURL=usePrice.js.map