import React from 'react';
import {
  runOnJS,
  SharedValue,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated';

import type { TContext, TData, TDomain } from './types';
import { getDomain } from './utils';

export const CandlestickChartContext = React.createContext<TContext>({
  currentX: { value: -1 } as SharedValue<number>,
  currentY: { value: -1 } as SharedValue<number>,
  currentIndex: { value: -1 } as SharedValue<number>,
  data: [],
  height: 0,
  width: 0,
  domain: [0, 0],
  step: 0,
  setWidth: () => undefined,
  setHeight: () => undefined,
});

type CandlestickChartProviderProps = {
  children: React.ReactNode;
  data: TData;
  valueRangeY?: TDomain;
  onCurrentIndexChange?: (x: number) => void;
};

export function CandlestickChartProvider({
  children,
  data = [],
  valueRangeY,
  onCurrentIndexChange,
}: CandlestickChartProviderProps) {
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const currentX = useSharedValue(-1);
  const currentY = useSharedValue(-1);
  const currentIndex = useSharedValue(-1);
  const domain = React.useMemo(
    () => valueRangeY ?? getDomain(data),
    [data, valueRangeY]
  );

  const step = React.useMemo(() => width / data.length, [data.length, width]);

  const contextValue = React.useMemo(
    () => ({
      currentX,
      currentY,
      currentIndex,
      data,
      width,
      height,
      domain,
      step,
      setWidth,
      setHeight,
    }),
    [currentIndex, currentX, currentY, data, domain, height, step, width]
  );

  useAnimatedReaction(
    () => currentIndex.value,
    (x, prevX) => {
      if (x !== prevX && onCurrentIndexChange) {
        runOnJS(onCurrentIndexChange)(x);
      }
    },
    [currentIndex]
  );

  return (
    <CandlestickChartContext.Provider value={contextValue}>
      {children}
    </CandlestickChartContext.Provider>
  );
}

CandlestickChartProvider.displayName = 'CandlestickChartProvider';
