import * as React from 'react';
import Animated from 'react-native-reanimated';
import { PathProps } from 'react-native-svg';
export declare type LineChartGradientProps = Animated.AnimateProps<PathProps> & {
    color?: string;
    children?: React.ReactNode;
};
export declare function LineChartGradient({ color: overrideColor, children, ...props }: LineChartGradientProps): JSX.Element;
export declare namespace LineChartGradient {
    var displayName: string;
}
