import * as React from 'react';
import { Svg } from 'react-native-svg';

import Candle from './Candle';
import { useCandlestickChart } from './useCandlestickChart';

type CandlesProps = {
  width?: number;
  height?: number;
};

export function Candles({
  width: widthOverride,
  height: heightOverride,
}: CandlesProps) {
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

  return (
    <Svg width={width} height={height}>
      {data.map((candle, index) => (
        <Candle
          key={candle.date as React.Key}
          domain={domain}
          maxHeight={height}
          width={step}
          candle={candle}
          index={index}
        />
      ))}
    </Svg>
  );
}
