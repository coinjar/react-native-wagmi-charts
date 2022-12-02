import type { TLineChartData } from './types';
import type { ReactNode } from 'react';
import type { TLineChartDataProp } from './types';
export declare const DefaultLineChartId = "__LineChartData";
export declare type LineChartDataContext = {
    [key: string]: TLineChartData;
};
export declare type LineChartDataProviderProps = {
    children: ReactNode;
    data: TLineChartDataProp;
};
export declare function LineChartDataProvider({ children, data, }: LineChartDataProviderProps): JSX.Element;
export declare function LineChartIdProvider({ id, children, }: {
    id?: string;
    children: ReactNode;
}): JSX.Element;
export declare const useLineChartId: () => string | undefined;
export declare function useLineChartData({ id }: {
    id?: string;
}): {
    data: TLineChartData;
};
