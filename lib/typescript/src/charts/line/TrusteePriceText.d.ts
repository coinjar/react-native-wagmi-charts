/// <reference types="react" />
import type { TextProps as RNTextProps } from 'react-native';
import type Animated from 'react-native-reanimated';
import type { TFormatterFn } from '../candle/types';
export declare type LineChartTrusteePriceTextProps = {
    format?: TFormatterFn<string>;
    precision?: number;
    variant?: 'formatted' | 'value';
    style?: Animated.AnimateProps<RNTextProps>['style'];
    currencySymbol?: string;
};
export declare function LineChartTrusteePriceText({ format, precision, variant, style, currencySymbol }: LineChartTrusteePriceTextProps): JSX.Element;
export declare namespace LineChartTrusteePriceText {
    var displayName: string;
}
