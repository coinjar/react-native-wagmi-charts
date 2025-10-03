import React, { createContext, useMemo } from 'react';

import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated';
import type { TLineChartData, TLineChartDataProp } from './types';
import { LineChartDataProvider } from './Data';

import type { TLineChartContext, YRangeProp } from './types';
import { getDomain, lineChartDataPropToArray } from './utils';

export const LineChartContext = createContext<TLineChartContext>({
  currentX: { value: -1 } as TLineChartContext['currentX'],
  currentIndex: { value: -1 } as TLineChartContext['currentIndex'],
  domain: [0, 0],
  isActive: { value: false } as TLineChartContext['isActive'],
  yDomain: {
    min: 0,
    max: 0,
  },
  xDomain: undefined,
  xLength: 0,
});

type LineChartProviderProps = {
  children: React.ReactNode;
  data: TLineChartDataProp;
  yRange?: YRangeProp;
  onCurrentIndexChange?: (x: number) => void;
  xLength?: number;
  xDomain?: [number, number];
};

export function LineChartProvider({
  children,
  data = [],
  yRange,
  onCurrentIndexChange,
  xLength,
  xDomain,
}: LineChartProviderProps) {
  const currentX = useSharedValue(-1);
  const currentIndex = useSharedValue(-1);
  const isActive = useSharedValue(false);

  const domain = useMemo(
    () =>
      getDomain(
        Array.isArray(data) ? data : (Object.values(data)[0] as TLineChartData)
      ),
    [data]
  );

  const values = useMemo(
    () => lineChartDataPropToArray(data).map(({ value }) => value),
    [data]
  );

  const yDomainValues = useMemo(
    () => ({
      min: yRange?.min ?? Math.min(...values),
      max: yRange?.max ?? Math.max(...values),
    }),
    [values, yRange?.min, yRange?.max]
  );

  const contextValue = useMemo<TLineChartContext>(() => {
    const domainRows = Array.isArray(data)
      ? data
      : (Object.values(data)[0] as TLineChartData);

    return {
      currentX,
      currentIndex,
      isActive,
      domain,
      yDomain: yDomainValues,
      xDomain,
      xLength: xLength ?? domainRows.length,
    };
  }, [
    currentIndex,
    currentX,
    data,
    domain,
    isActive,
    yDomainValues,
    xLength,
    xDomain,
  ]);

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
    <LineChartDataProvider data={data}>
      <LineChartContext.Provider value={contextValue}>
        {children}
      </LineChartContext.Provider>
    </LineChartDataProvider>
  );
}

LineChartProvider.displayName = 'LineChartProvider';
