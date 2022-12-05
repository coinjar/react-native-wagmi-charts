import Animated from 'react-native-reanimated';
import type { TFormatterFn } from './types';
export declare function useCandlestickChartDatetime({ format, locale, options, }?: {
    format?: TFormatterFn<number>;
    locale?: string;
    options?: {
        [key: string]: string;
    };
}): {
    value: Readonly<Animated.SharedValue<string>>;
    formatted: Readonly<Animated.SharedValue<string>>;
};
