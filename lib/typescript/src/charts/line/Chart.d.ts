import * as React from 'react';
import { ViewProps } from 'react-native';
export declare const LineChartDimensionsContext: React.Context<{
    width: number;
    height: number;
    path: string;
    area: string;
    shape: any;
    gutter: number;
    pathWidth: number;
}>;
declare type LineChartProps = ViewProps & {
    children: React.ReactNode;
    yGutter?: number;
    width?: number;
    height?: number;
    shape?: unknown;
    /**
     * If your `LineChart.Provider` uses a dictionary with multiple IDs for multiple paths, then this field is required.
     */
    id?: string;
    absolute?: boolean;
};
export declare function LineChart({ children, yGutter, width, height, shape, id, absolute, ...props }: LineChartProps): JSX.Element;
export declare namespace LineChart {
    var displayName: string;
}
export {};
