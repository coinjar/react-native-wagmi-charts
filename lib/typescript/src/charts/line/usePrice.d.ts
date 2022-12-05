import type { TFormatterFn } from '../candle/types';
export declare function useLineChartPrice({ format, precision, currencySymbol }?: {
    format?: TFormatterFn<string>;
    precision?: number;
    currencySymbol?: string;
}): {
    value: Readonly<{
        value: string;
    }>;
    formatted: Readonly<{
        value: string;
    }>;
};
