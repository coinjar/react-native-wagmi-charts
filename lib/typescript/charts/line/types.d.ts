import type Animated from 'react-native-reanimated';
export declare type TLineChartPoint = {
    timestamp: number;
    value: number;
};
export declare type TLineChartDataProp = TLineChartData | {
    [key: string]: TLineChartData;
};
export declare type TLineChartData = Array<TLineChartPoint>;
export declare type TLineChartDomain = [number, number];
export declare type TLineChartContext = {
    currentX: Animated.SharedValue<number>;
    currentIndex: Animated.SharedValue<number>;
    isActive: Animated.SharedValue<boolean>;
    domain: TLineChartDomain;
    yDomain: YDomain;
    xLength: number;
};
export declare type YRangeProp = {
    min?: number;
    max?: number;
};
export declare type YDomain = {
    min: number;
    max: number;
};
