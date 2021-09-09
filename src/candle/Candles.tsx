import * as React from 'react';
import { Svg } from 'react-native-svg';

import { Candle, CandleProps } from './Candle';
import { useCandlestickChart } from './useCandlestickChart';

type CandlesProps = {
  width?: number;
  height?: number;
  positiveColor?: CandleProps['positiveColor'];
  negativeColor?: CandleProps['negativeColor'];
  renderRect?: CandleProps['renderRect'];
  renderLine?: CandleProps['renderLine'];
  rectProps?: CandleProps['rectProps'];
  lineProps?: CandleProps['lineProps'];
  useAnimations?: boolean;
};

export function Candles({
  width: widthOverride,
  height: heightOverride,
  positiveColor,
  negativeColor,
  rectProps,
  lineProps,
  useAnimations = true,
  renderRect,
  renderLine,
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
          key={index as React.Key}
          domain={domain}
          maxHeight={height}
          width={step}
          positiveColor={positiveColor}
          negativeColor={negativeColor}
          renderRect={renderRect}
          renderLine={renderLine}
          rectProps={rectProps}
          lineProps={lineProps}
          useAnimations={useAnimations}
          candle={candle}
          index={index}
        />
      ))}
    </Svg>
  );
}
