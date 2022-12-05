/// <reference types="react" />
import { LineProps } from 'react-native-svg';
export declare type CandlestickChartLineProps = Omit<LineProps, 'x' | 'y'> & {
    color?: string;
    x: number;
    y: number;
};
export declare const CandlestickChartLine: ({ color, x, y, ...props }: CandlestickChartLineProps) => JSX.Element;
