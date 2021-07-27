import * as React from 'react';
import { Svg } from 'react-native-svg';
import Candle from './Candle';
import { useCandlestickChart } from './useCandlestickChart';
export function Candles({
  width: widthOverride,
  height: heightOverride,
  positiveColor,
  negativeColor,
  renderRect,
  renderLine,
}) {
  const { data, width, height, domain, step, setHeight, setWidth } =
    useCandlestickChart();
  ////////////////////////////////////////////////
  React.useEffect(() => {
    if (widthOverride) {
      setWidth(widthOverride);
    }
  }, [widthOverride, setWidth]);
  React.useEffect(() => {
    if (heightOverride) {
      setHeight(heightOverride);
    }
  }, [heightOverride, setHeight]);
  ////////////////////////////////////////////////
  return React.createElement(
    Svg,
    { width: width, height: height },
    data.map((candle, index) =>
      React.createElement(Candle, {
        key: candle.date,
        domain: domain,
        maxHeight: height,
        width: step,
        positiveColor: positiveColor,
        negativeColor: negativeColor,
        renderRect: renderRect,
        renderLine: renderLine,
        candle: candle,
        index: index,
      })
    )
  );
}
