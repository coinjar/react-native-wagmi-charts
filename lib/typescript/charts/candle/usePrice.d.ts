import Animated from 'react-native-reanimated';
import type { TFormatterFn, TPriceType } from './types';
export declare function useCandlestickChartPrice({ format, precision, type, }?: {
    format?: TFormatterFn<string>;
    precision?: number;
    type?: TPriceType;
}): {
    value: Readonly<Animated.SharedValue<string>>;
    formatted: Readonly<Animated.SharedValue<string>>;
};
