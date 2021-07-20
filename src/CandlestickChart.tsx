import * as React from 'react';
import { View } from 'react-native';
import { Svg } from 'react-native-svg';

import Candle from './Candle';
import { useCandlestickChart } from './useCandlestickChart';
import type { TData } from './types';

type CandlestickChartProps = {
  data: TData;
  width: number;
  height: number;
};

export function CandlestickChart({
  width: _width,
  height: _height,
  ...props
}: CandlestickChartProps) {
  const { data, width, height, domain, step, setHeight, setWidth } =
    useCandlestickChart();

  React.useEffect(() => {
    if (_width) {
      setWidth(_width);
    }
  }, [_width, setWidth]);

  React.useEffect(() => {
    if (_height) {
      setHeight(_height);
    }
  }, [_height, setHeight]);

  return (
    <View {...props}>
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
    </View>
  );
}
