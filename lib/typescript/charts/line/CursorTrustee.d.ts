import * as React from 'react';
import { ViewProps } from 'react-native';
import Animated from 'react-native-reanimated';
import { LineProps } from 'react-native-svg';
import { LineChartCursorProps } from './Cursor';
declare type LineChartCursorTrusteeProps = Omit<LineChartCursorProps, 'children' | 'type'> & {
    children?: React.ReactNode;
    color?: string;
    horizontalLineColor?: string;
    verticalLineColor?: string;
    size?: number;
    outerSize?: number;
    crosshairWrapperProps?: Animated.AnimateProps<ViewProps>;
    crosshairProps?: ViewProps;
    crosshairOuterProps?: ViewProps;
    lineVerticalProps?: Partial<LineProps>;
    lineHorizontalProps?: Partial<LineProps>;
};
export declare function LineChartCursorTrustee({ children, color, horizontalLineColor, verticalLineColor, size, outerSize, crosshairWrapperProps, crosshairProps, crosshairOuterProps, lineVerticalProps, lineHorizontalProps, ...props }: LineChartCursorTrusteeProps): JSX.Element;
export declare namespace LineChartCursorTrustee {
    var displayName: string;
}
export {};
