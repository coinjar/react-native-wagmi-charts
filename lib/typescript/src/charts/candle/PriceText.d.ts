/// <reference types="react" />
import type { TextProps as RNTextProps } from 'react-native';
import type Animated from 'react-native-reanimated';
import type { TFormatterFn, TPriceType } from './types';
export declare type CandlestickChartPriceTextProps = {
    format?: TFormatterFn<string>;
    precision?: number;
    variant?: 'formatted' | 'value';
    type?: TPriceType;
    style?: Animated.AnimateProps<RNTextProps>['style'];
};
export declare function CandlestickChartPriceText({ format, precision, variant, type, style, }: CandlestickChartPriceTextProps): JSX.Element;
