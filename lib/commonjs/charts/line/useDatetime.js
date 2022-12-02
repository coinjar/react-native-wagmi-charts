"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLineChartDatetime = useLineChartDatetime;

var _reactNativeReanimated = require("react-native-reanimated");

var _utils = require("../../utils");

var _useLineChart = require("./useLineChart");

function useLineChartDatetime({
  format,
  locale,
  options
} = {}) {
  const {
    currentIndex,
    data
  } = (0, _useLineChart.useLineChart)();
  const timestamp = (0, _reactNativeReanimated.useDerivedValue)(() => {
    if (typeof currentIndex.value === 'undefined' || currentIndex.value === -1) return '';
    return data[currentIndex.value].timestamp;
  });
  const timestampString = (0, _reactNativeReanimated.useDerivedValue)(() => {
    if (timestamp.value === '') return '';
    return timestamp.value.toString();
  });
  const formatted = (0, _reactNativeReanimated.useDerivedValue)(() => {
    const formattedDatetime = timestamp.value ? (0, _utils.formatDatetime)({
      value: timestamp.value,
      locale,
      options
    }) : '';
    return format ? format({
      value: timestamp.value || -1,
      formatted: formattedDatetime
    }) : formattedDatetime;
  });
  return {
    value: timestampString,
    formatted
  };
}
//# sourceMappingURL=useDatetime.js.map