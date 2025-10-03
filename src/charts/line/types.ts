import type { SharedValue } from 'react-native-reanimated';

export type TLineChartPoint = {
  timestamp: number;
  value: number;
};
export type TLineChartDataProp =
  | TLineChartData
  | {
      [key: string]: TLineChartData;
    };
export type TLineChartData = Array<TLineChartPoint>;
export type TLineChartContext = {
  currentX: SharedValue<number>;
  currentIndex: SharedValue<number>;
  isActive: SharedValue<boolean>;
  domain: [number, number];
  yDomain: YDomain;
  xLength: number;
  xDomain?: [number, number] | undefined;
};

export type YRangeProp = {
  min?: number;
  max?: number;
};

export type YDomain = {
  min: number;
  max: number;
};
