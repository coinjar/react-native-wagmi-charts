"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCandlestickChartDatetime = useCandlestickChartDatetime;

var _reactNativeReanimated = require("react-native-reanimated");

var _utils = require("../../utils");

var _useCandleData = require("./useCandleData");

function useCandlestickChartDatetime({
  format,
  locale,
  options
} = {}) {
  const candle = (0, _useCandleData.useCandleData)();
  const timestamp = (0, _reactNativeReanimated.useDerivedValue)(() => {
    return candle.value.timestamp;
  });
  const timestampString = (0, _reactNativeReanimated.useDerivedValue)(() => {
    if (timestamp.value === -1) return '';
    return timestamp.value.toString();
  });
  const formatted = (0, _reactNativeReanimated.useDerivedValue)(() => {
    if (timestamp.value === -1) return '';
    const formattedDatetime = (0, _utils.formatDatetime)({
      value: timestamp.value,
      locale,
      options
    });
    return format ? format({
      value: timestamp.value,
      formatted: formattedDatetime
    }) : formattedDatetime;
  });
  return {
    value: timestampString,
    formatted
  };
}
//# sourceMappingURL=useDatetime.js.map