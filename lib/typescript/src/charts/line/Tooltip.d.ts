import * as React from 'react';
import type { ViewProps } from 'react-native';
import Animated from 'react-native-reanimated';
import { LineChartPriceTextProps } from './PriceText';
declare type LineChartTooltipProps = Animated.AnimateProps<ViewProps> & {
    children?: React.ReactNode;
    xGutter?: number;
    yGutter?: number;
    cursorGutter?: number;
    position?: 'top' | 'bottom';
    textProps?: LineChartPriceTextProps;
    textStyle?: LineChartPriceTextProps['style'];
};
export declare function LineChartTooltip({ children, xGutter, yGutter, cursorGutter, position, textProps, textStyle, ...props }: LineChartTooltipProps): JSX.Element;
export declare namespace LineChartTooltip {
    var displayName: string;
}
export {};
