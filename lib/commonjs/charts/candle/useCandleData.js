"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCandleData = useCandleData;

var _reactNativeReanimated = require("react-native-reanimated");

var _useCandlestickChart = require("./useCandlestickChart");

function useCandleData() {
  const {
    currentX,
    data,
    step
  } = (0, _useCandlestickChart.useCandlestickChart)();
  const candle = (0, _reactNativeReanimated.useDerivedValue)(() => {
    if (currentX.value === -1) {
      return {
        timestamp: -1,
        low: -1,
        open: -1,
        high: -1,
        close: -1
      };
    }

    return data[Math.floor(currentX.value / step)];
  });
  return candle;
}
//# sourceMappingURL=useCandleData.js.map