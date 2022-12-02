import * as React from 'react';
import { ViewProps } from 'react-native';
import { LongPressGestureHandlerProps } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { CandlestickChartLineProps } from './Line';
declare type CandlestickChartCrosshairProps = LongPressGestureHandlerProps & {
    color?: string;
    children?: React.ReactNode;
    onCurrentXChange?: (value: number) => unknown;
    horizontalCrosshairProps?: Animated.AnimateProps<ViewProps>;
    verticalCrosshairProps?: Animated.AnimateProps<ViewProps>;
    lineProps?: Partial<CandlestickChartLineProps>;
};
export declare function CandlestickChartCrosshair({ color, onCurrentXChange, children, horizontalCrosshairProps, verticalCrosshairProps, lineProps, ...props }: CandlestickChartCrosshairProps): JSX.Element;
export {};
