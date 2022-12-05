import * as React from 'react';
import { ViewProps } from 'react-native';
import Animated from 'react-native-reanimated';
import { LineChartCursorProps } from './Cursor';
declare type LineChartCursorCrosshairProps = Omit<LineChartCursorProps, 'children' | 'type'> & {
    children?: React.ReactNode;
    color?: string;
    size?: number;
    outerSize?: number;
    crosshairWrapperProps?: Animated.AnimateProps<ViewProps>;
    crosshairProps?: ViewProps;
    crosshairOuterProps?: ViewProps;
};
export declare function LineChartCursorCrosshair({ children, color, size, outerSize, crosshairWrapperProps, crosshairProps, crosshairOuterProps, ...props }: LineChartCursorCrosshairProps): JSX.Element;
export declare namespace LineChartCursorCrosshair {
    var displayName: string;
}
export {};
