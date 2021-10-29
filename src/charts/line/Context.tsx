import * as React from 'react';
import { useSharedValue } from 'react-native-reanimated';

import type { TLineChartContext, TLineChartData } from './types';
import { getDomain } from './utils';

export const LineChartContext = React.createContext<TLineChartContext>({
  currentX: { value: -1 },
  currentY: { value: -1 },
  currentIndex: { value: -1 },
  data: [],
  domain: [0, 0],
  isActive: { value: false },
});

type LineChartProviderProps = {
  children: React.ReactNode;
  data: TLineChartData;
};

LineChartProvider.displayName = 'LineChartProvider';

export function LineChartProvider({
  children,
  data = [],
}: LineChartProviderProps) {
  const currentX = useSharedValue(-1);
  const currentY = useSharedValue(-1);
  const currentIndex = useSharedValue(-1);
  const isActive = useSharedValue(false);

  const domain = React.useMemo(() => getDomain(data), [data]);

  const contextValue = React.useMemo(
    () => ({
      currentX,
      currentY,
      currentIndex,
      data,
      isActive,
      domain,
    }),
    [currentIndex, currentX, currentY, data, domain, isActive]
  );

  return (
    <LineChartContext.Provider value={contextValue}>
      {children}
    </LineChartContext.Provider>
  );
}
