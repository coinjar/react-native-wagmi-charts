import * as React from 'react';
import type { TLineChartDataProp } from './types';
import type { TLineChartContext, YRangeProp } from './types';
export declare const LineChartContext: React.Context<TLineChartContext>;
declare type LineChartProviderProps = {
    children: React.ReactNode;
    data: TLineChartDataProp;
    high: number;
    low: number;
    yRange?: YRangeProp;
    onCurrentIndexChange?: (x: number) => void;
    xLength?: number;
};
export declare function LineChartProvider({ children, data, high, low, yRange, onCurrentIndexChange, xLength, }: LineChartProviderProps): JSX.Element;
export declare namespace LineChartProvider {
    var displayName: string;
}
export {};
