import * as React from 'react';
import { Svg, SvgProps } from 'react-native-svg';

import { CandlestickChartDimensionsContext } from './Chart';
import { CandlestickChartCandle, CandlestickChartCandleProps } from './Candle';
import { useCandlestickChart } from './useCandlestickChart';

type CandlestickChartCandlesProps = SvgProps & {
  width?: number;
  height?: number;
  positiveColor?: CandlestickChartCandleProps['positiveColor'];
  negativeColor?: CandlestickChartCandleProps['negativeColor'];
  renderRect?: CandlestickChartCandleProps['renderRect'];
  renderLine?: CandlestickChartCandleProps['renderLine'];
  rectProps?: CandlestickChartCandleProps['rectProps'];
  lineProps?: CandlestickChartCandleProps['lineProps'];
  useAnimations?: boolean;
};

export function CandlestickChartCandles({
  positiveColor,
  negativeColor,
  rectProps,
  lineProps,
  useAnimations = true,
  renderRect,
  renderLine,
  ...props
}: CandlestickChartCandlesProps) {
  const { width, height } = React.useContext(CandlestickChartDimensionsContext);
  const { data, domain, step } = useCandlestickChart();

  ////////////////////////////////////////////////

  return (
    <Svg width={width} height={height} {...props}>
      {data.map((candle, index) => (
        <CandlestickChartCandle
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
