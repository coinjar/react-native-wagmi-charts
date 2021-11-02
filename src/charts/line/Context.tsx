import * as React from 'react';
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated';

import type { TLineChartContext, TLineChartData, YRangeProp } from './types';
import { getDomain } from './utils';

export const LineChartContext = React.createContext<TLineChartContext>({
  currentX: { value: -1 },
  currentY: { value: -1 },
  currentIndex: { value: -1 },
  data: [],
  domain: [0, 0],
  isActive: { value: false },
  yDomain: {
    min: 0,
    max: 0,
  },
});

type LineChartProviderProps = {
  children: React.ReactNode;
  data: TLineChartData;
  yRange?: YRangeProp;
  onCurrentIndexChange?: (x: number) => void;
};

export function LineChartProvider({
  children,
  data = [],
  yRange,
  onCurrentIndexChange,
}: LineChartProviderProps) {
  const currentX = useSharedValue(-1);
  const currentY = useSharedValue(-1);
  const currentIndex = useSharedValue(-1);
  const isActive = useSharedValue(false);

  const domain = React.useMemo(() => getDomain(data), [data]);

  const contextValue = React.useMemo<TLineChartContext>(
    () => ({
      currentX,
      currentY,
      currentIndex,
      data,
      isActive,
      domain,
      yDomain: {
        min: yRange?.min ?? Math.min(...data.map(({ value }) => value)),
        max: yRange?.max ?? Math.max(...data.map(({ value }) => value)),
      },
    }),
    [
      currentIndex,
      currentX,
      currentY,
      data,
      domain,
      isActive,
      yRange?.max,
      yRange?.min,
    ]
  );

  useAnimatedReaction(
    () => currentIndex.value,
    (x, prevX) => {
      if (x !== -1 && x !== prevX && onCurrentIndexChange) {
        runOnJS(onCurrentIndexChange)(x);
      }
    }
  );

  return (
    <LineChartContext.Provider value={contextValue}>
      {children}
    </LineChartContext.Provider>
  );
}
