import type { TFormatterFn } from '../candle/types';
export declare function useLineChartDatetime({ format, locale, options, }?: {
    format?: TFormatterFn<number>;
    locale?: string;
    options?: Intl.DateTimeFormatOptions;
}): {
    value: Readonly<{
        value: any;
    }>;
    formatted: Readonly<{
        value: string;
    }>;
};
