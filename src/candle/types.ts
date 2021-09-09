import type Animated from 'react-native-reanimated';

export type TCandle = {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
};
export type TData = Array<TCandle>;
export type TDomain = [number, number];
export type TContext = {
  currentX: Animated.SharedValue<number>;
  currentY: Animated.SharedValue<number>;
  data: TData;
  width: number;
  height: number;
  domain: TDomain;
  step: number;
  setHeight: (height: number) => void;
  setWidth: (width: number) => void;
};
export type TPriceType = 'crosshair' | 'open' | 'close' | 'low' | 'high';
