import * as React from 'react';
import { SharedValue, useSharedValue } from 'react-native-reanimated';

import type { TContext, TData, TDomain } from './types';
import { getDomain } from './utils';

export const CandlestickChartContext = React.createContext<TContext>({
  currentX: { value: -1 } as SharedValue<number>,
  currentY: { value: -1 } as SharedValue<number>,
  data: [],
  height: 0,
  width: 0,
  domain: [0, 0],
  step: 0,
  setWidth: () => undefined,
  setHeight: () => undefined,
  currentIndex: -1,
  setCurrentIndex: () => {},
  setCurrentX: () => {},
  setCurrentY: () => {},
});

type CandlestickChartProviderProps = {
  children: React.ReactNode;
  data: TData;
  width?: number;
  height?: number;
  valueRangeY?: TDomain;
};

export function CandlestickChartProvider({
  children,
  data = [],
  valueRangeY,
}: CandlestickChartProviderProps) {
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const currentX = useSharedValue(-1);
  const currentY = useSharedValue(-1);

  const domain = React.useMemo(
    () => valueRangeY ?? getDomain(data),
    [data, valueRangeY]
  );

  // Custom crosshair
  const [currentIndex, setCurrentIndex] = React.useState<number>(-1);
  const setCurrentX = (value: number) => {
    'worklet';
    currentX.value = value;
  };
  const setCurrentY = (value: number) => {
    'worklet';
    currentY.value = value;
  };

  const step = React.useMemo(() => width / data.length, [data.length, width]);

  const contextValue = React.useMemo(
    () => ({
      currentX,
      currentY,
      data,
      width,
      height,
      domain,
      step,
      setWidth,
      setHeight,

      // Custom crosshair index
      currentIndex,
      setCurrentIndex,
      setCurrentX,
      setCurrentY,
    }),
    [
      currentX,
      currentY,
      data,
      domain,
      height,
      step,
      width,

      // Custom crosshair index
      currentIndex,
      setCurrentIndex,
      setCurrentX,
      setCurrentY,
    ]
  );

  return (
    <CandlestickChartContext.Provider value={contextValue}>
      {children}
    </CandlestickChartContext.Provider>
  );
}
