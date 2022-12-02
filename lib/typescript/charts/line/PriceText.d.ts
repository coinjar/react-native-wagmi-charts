/// <reference types="react" />
import type { TextProps as RNTextProps } from 'react-native';
import type Animated from 'react-native-reanimated';
import type { TFormatterFn } from '../candle/types';
export declare type LineChartPriceTextProps = {
    format?: TFormatterFn<string>;
    precision?: number;
    variant?: 'formatted' | 'value';
    style?: Animated.AnimateProps<RNTextProps>['style'];
};
export declare function LineChartPriceText({ format, precision, variant, style, }: LineChartPriceTextProps): JSX.Element;
export declare namespace LineChartPriceText {
    var displayName: string;
}
