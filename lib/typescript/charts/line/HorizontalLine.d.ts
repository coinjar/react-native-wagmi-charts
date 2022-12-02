/// <reference types="react" />
import { LineProps } from 'react-native-svg';
declare type HorizontalLineProps = {
    color?: string;
    lineProps?: Partial<LineProps>;
    offsetY?: number;
    /**
     * (Optional) A pixel value to nudge the line up or down.
     *
     * This may be useful to customize the line's position based on the thickness of your cursor or chart path.
     *
     * ```tsx
     * <LineChart.HorizontalLine
     *   at={{ index: 3 }}
     * />
     *
     * // or
     *
     * <LineChart.HorizontalLine
     *   at={{ value: 320.32}}
     * />
     * ```
     */
    at?: {
        index: number;
        value?: never;
    } | {
        index?: never;
        value: number;
    } | number;
};
export declare function LineChartHorizontalLine({ color, lineProps, at, offsetY, }: HorizontalLineProps): JSX.Element;
export declare namespace LineChartHorizontalLine {
    var displayName: string;
}
export {};
