import type { TLineChartData, YDomain } from '../types';
export declare function getPath({ data, from, to, width, height, gutter, shape: _shape, yDomain, }: {
    data: TLineChartData;
    from?: number;
    to?: number;
    width: number;
    height: number;
    gutter: number;
    shape?: unknown;
    yDomain: YDomain;
}): string;
