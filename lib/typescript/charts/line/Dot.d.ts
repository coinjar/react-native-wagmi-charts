/// <reference types="react" />
import Animated from 'react-native-reanimated';
import { CircleProps } from 'react-native-svg';
export declare type LineChartDotProps = {
    dotProps?: Animated.AnimateProps<CircleProps>;
    outerDotProps?: Animated.AnimateProps<CircleProps>;
    color?: string;
    inactiveColor?: string;
    showInactiveColor?: boolean;
    at: number;
    size?: number;
    hasPulse?: boolean;
    hasOuterDot?: boolean;
    /**
     * If `always`, the outer dot will still animate when interaction is active.
     *
     * If `while-inactive`, the outer dot will animate only when the interaction is inactive.
     *
     * Default: `while-inactive`
     */
    pulseBehaviour?: 'always' | 'while-inactive';
    /**
     * Defaults to `size * 4`
     */
    outerSize?: number;
    pulseDurationMs?: number;
};
export declare function LineChartDot({ at, color: defaultColor, dotProps, hasOuterDot: defaultHasOuterDot, hasPulse, inactiveColor, outerDotProps, pulseBehaviour, pulseDurationMs, showInactiveColor, size, outerSize, }: LineChartDotProps): JSX.Element;
export declare namespace LineChartDot {
    var displayName: string;
}
