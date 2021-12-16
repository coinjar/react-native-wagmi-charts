import * as React from 'react';
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated';
import type { TLineChartDataProp } from './types';
import { LineChartDataProvider } from './Data';

import type { TLineChartContext, YRangeProp } from './types';
import { getDomain, lineChartDataPropToArray } from './utils';

export const LineChartContext = React.createContext<TLineChartContext>({
  currentX: { value: -1 },
  currentIndex: { value: -1 },
  domain: [0, 0],
  isActive: { value: false },
  yDomain: {
    min: 0,
    max: 0,
  },
  xLength: 0,
});

type LineChartProviderProps = {
  children: React.ReactNode;
  data: TLineChartDataProp;
  yRange?: YRangeProp;
  onCurrentIndexChange?: (x: number) => void;
  xLength?: number;
};

LineChartProvider.displayName = 'LineChartProvider';

export function LineChartProvider({
  children,
  data = [],
  yRange,
  onCurrentIndexChange,
  xLength,
}: LineChartProviderProps) {
  const currentX = useSharedValue(-1);
  const currentIndex = useSharedValue(-1);
  const isActive = useSharedValue(false);

  const domain = React.useMemo(
    () => getDomain(Array.isArray(data) ? data : Object.values(data)[0]),
    [data]
  );

  const contextValue = React.useMemo<TLineChartContext>(() => {
    const values = lineChartDataPropToArray(data).map(({ value }) => value);

    return {
      currentX,
      currentIndex,
      isActive,
      domain,
      yDomain: {
        min: yRange?.min ?? Math.min(...values),
        max: yRange?.max ?? Math.max(...values),
      },
      xLength:
        xLength ?? (Array.isArray(data) ? data : Object.values(data)[0]).length,
    };
  }, [
    currentIndex,
    currentX,
    data,
    domain,
    isActive,
    yRange?.max,
    yRange?.min,
    xLength,
  ]);

  useAnimatedReaction(
    () => currentIndex.value,
    (x, prevX) => {
      if (x !== -1 && x !== prevX && onCurrentIndexChange) {
        runOnJS(onCurrentIndexChange)(x);
      }
    }
  );

  return (
    <LineChartDataProvider data={data}>
      <LineChartContext.Provider value={contextValue}>
        {children}
      </LineChartContext.Provider>
    </LineChartDataProvider>
  );
}
