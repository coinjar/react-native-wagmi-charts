/// <reference types="react" />
import Animated from 'react-native-reanimated';
import { PathProps } from 'react-native-svg';
export declare type LineChartColorProps = Animated.AnimateProps<PathProps> & {
    color?: string;
    from: number;
    to: number;
    showInactiveColor?: boolean;
    inactiveColor?: string;
    width?: number;
};
export declare function LineChartHighlight({ color, inactiveColor, showInactiveColor, from, to, width: strokeWidth, ...props }: LineChartColorProps): JSX.Element;
export declare namespace LineChartHighlight {
    var displayName: string;
}
