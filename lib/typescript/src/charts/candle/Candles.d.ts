/// <reference types="react" />
import { SvgProps } from 'react-native-svg';
import { CandlestickChartCandleProps } from './Candle';
declare type CandlestickChartCandlesProps = SvgProps & {
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
export declare function CandlestickChartCandles({ positiveColor, negativeColor, rectProps, lineProps, margin, useAnimations, renderRect, renderLine, candleProps, ...props }: CandlestickChartCandlesProps): JSX.Element;
export {};
