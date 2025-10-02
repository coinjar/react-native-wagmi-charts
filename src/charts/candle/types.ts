import type React from 'react';
import type { SharedValue } from 'react-native-reanimated';

export type TCandle = {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
};
export type TData = Array<TCandle>;
export type TDomain = [min: number, max: number];
export type TContext = {
  currentX: SharedValue<number>;
  currentY: SharedValue<number>;
  currentIndex: SharedValue<number>;
  data: TData;
  width: number;
  height: number;
  domain: TDomain;
  step: number;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
  setHeight: React.Dispatch<React.SetStateAction<number>>;
};
export type TPriceType = 'crosshair' | 'open' | 'close' | 'low' | 'high';
