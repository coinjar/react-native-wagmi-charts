import type React from 'react';
import type Animated from 'react-native-reanimated';
export declare type TCandle = {
    timestamp: number;
    open: number;
    high: number;
    low: number;
    close: number;
};
export declare type TData = Array<TCandle>;
export declare type TDomain = [min: number, max: number];
export declare type TContext = {
    currentX: Animated.SharedValue<number>;
    currentY: Animated.SharedValue<number>;
    data: TData;
    width: number;
    height: number;
    domain: TDomain;
    step: number;
    setWidth: React.Dispatch<React.SetStateAction<number>>;
    setHeight: React.Dispatch<React.SetStateAction<number>>;
};
export declare type TPriceType = 'crosshair' | 'open' | 'close' | 'low' | 'high';
export declare type TFormatterFn<T> = ({ value, formatted, }: {
    value: T;
    formatted: string;
}) => string;
