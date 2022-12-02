import type { TFormatterFn } from '../candle/types';
export declare function useLineChartPrice({ format, precision, }?: {
    format?: TFormatterFn<string>;
    precision?: number;
}): {
    value: Readonly<{
        value: string;
    }>;
    formatted: Readonly<{
        value: string;
    }>;
};
