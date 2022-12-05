/// <reference types="react" />
import Animated from 'react-native-reanimated';
import { PathProps } from 'react-native-svg';
export declare type LineChartPathProps = Animated.AnimateProps<PathProps> & {
    color?: string;
    inactiveColor?: string;
    width?: number;
    isInactive?: boolean;
    /**
     * Default: `true`.
     *
     * If `false`, changes in the chart's path will not animate.
     *
     * While this use case is rare, it may be useful on web, where animations might not work as well.
     *
     * **Example**
     *
     * ```tsx
     * <LineChart.Path
     *   pathProps={{ isTransitionEnabled: Platform.OS !== 'web' }}
     * />
     * ```
     */
    isTransitionEnabled?: boolean;
};
export declare function LineChartPath({ color, inactiveColor, width: strokeWidth, ...props }: LineChartPathProps): JSX.Element;
export declare namespace LineChartPath {
    var displayName: string;
}
