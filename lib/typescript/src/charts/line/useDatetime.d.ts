import type { TFormatterFn } from '../candle/types';
export declare function useLineChartDatetime({ format, locale, options, trustee }?: {
    format?: TFormatterFn<number>;
    locale?: string;
    options?: Intl.DateTimeFormatOptions;
    trustee?: string;
}): {
    value: Readonly<{
        value: any;
    }>;
    formatted: Readonly<{
        value: string;
    }>;
};
