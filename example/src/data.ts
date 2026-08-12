import candles from './data/candlestick-data.json';
import lineData from './data/line-data.json';

export { candles, lineData };

export const reversedCandles = [...candles].reverse();

/** A second line series, taken from the reversed candles' open prices. */
export const lineData2 = reversedCandles.map((candle) => ({
  timestamp: candle.timestamp,
  value: candle.open,
}));

/** Irregularly spaced points, for the non-linear `xDomain`. Offsets in seconds. */
const GAP_OFFSETS = [0, 1900, 2100, 3400, 3600, 4600, 5600, 7600];
export const gapLine = GAP_OFFSETS.map((offset, index) => ({
  timestamp: lineData[0]!.timestamp + offset * 1000,
  value: lineData[index]!.value,
}));
