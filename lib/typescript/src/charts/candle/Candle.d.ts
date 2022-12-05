import React from 'react';
import { Color, LineProps, NumberProp, RectProps } from 'react-native-svg';
import type { TCandle, TDomain } from './types';
export declare type CandlestickChartCandleProps = {
    candle: TCandle;
    domain: TDomain;
    maxHeight: number;
    margin?: number;
    positiveColor?: string;
    negativeColor?: string;
    index: number;
    width: number;
    rectProps?: RectProps;
    lineProps?: LineProps;
    useAnimations?: boolean;
    renderRect?: ({ x, y, width, height, fill, }: {
        x: NumberProp;
        y: NumberProp;
        width: NumberProp;
        height: NumberProp;
        fill: Color;
        useAnimations: boolean;
    }) => React.ReactNode;
    renderLine?: ({ x1, y1, x2, y2, stroke, strokeWidth, }: {
        x1: NumberProp;
        y1: NumberProp;
        x2: NumberProp;
        y2: NumberProp;
        stroke: Color;
        strokeWidth: NumberProp;
        useAnimations: boolean;
    }) => React.ReactNode;
};
export declare const CandlestickChartCandle: ({ candle, maxHeight, domain, margin, positiveColor, negativeColor, rectProps: overrideRectProps, lineProps: overrideLineProps, index, width, useAnimations, renderLine, renderRect, }: CandlestickChartCandleProps) => JSX.Element;
