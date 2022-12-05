import React from 'react';
import { LineProps } from 'react-native-svg';
declare type LineChartCursorLineProps = {
    children?: React.ReactNode;
    color?: string;
    lineProps?: Partial<LineProps>;
};
export declare function LineChartCursorLine({ children, color, lineProps, }: LineChartCursorLineProps): JSX.Element;
export declare namespace LineChartCursorLine {
    var displayName: string;
}
export {};
