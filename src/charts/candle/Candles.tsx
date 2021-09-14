import * as React from 'react';
import { Svg, SvgProps } from 'react-native-svg';

import { CandlestickChartDimensionsContext } from './Chart';
import { CandlestickChartCandle, CandlestickChartCandleProps } from './Candle';
import { useCandlestickChart } from './useCandlestickChart';

type CandlestickChartCandlesProps = SvgProps & {
  width?: number;
  height?: number;
  margin?: CandlestickChartCandleProps['margin'];
  positiveColor?: CandlestickChartCandleProps['positiveColor'];
  negativeColor?: CandlestickChartCandleProps['negativeColor'];
  renderRect?: CandlestickChartCandleProps['renderRect'];
  renderLine?: CandlestickChartCandleProps['renderLine'];
  rectProps?: CandlestickChartCandleProps['rectProps'];
  lineProps?: CandlestickChartCandleProps['lineProps'];
  candleProps?: Partial<CandlestickChartCandleProps>;
  useAnimations?: boolean;
};

export function CandlestickChartCandles({
  positiveColor,
  negativeColor,
  rectProps,
  lineProps,
  margin,
  useAnimations = true,
  renderRect,
  renderLine,
  candleProps,
  ...props
}: CandlestickChartCandlesProps) {
  const { width, height } = React.useContext(CandlestickChartDimensionsContext);
  const { data, domain, step } = useCandlestickChart();

  ////////////////////////////////////////////////

  return (
    <Svg width={width} height={height} {...props}>
      {step > 0 &&
        data.map((candle, index) => (
          <CandlestickChartCandle
            key={index as React.Key}
            domain={domain}
            margin={margin}
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
            {...candleProps}
          />
        ))}
    </Svg>
  );
}
