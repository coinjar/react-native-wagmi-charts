import * as React from 'react';
import { Dimensions } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import type { TLineChartContext, TLineChartData } from './types';
import { getDomain, getPath } from './utils';

export const LineChartContext = React.createContext<TLineChartContext>({
  currentX: { value: -1 },
  currentY: { value: -1 },
  currentIndex: { value: -1 },
  data: [],
  height: 0,
  width: 0,
  domain: [0, 0],
  isActive: { value: false },
  path: '',
});

type LineChartProviderProps = {
  children: React.ReactNode;
  data: TLineChartData;
  gutter?: number;
  width?: number;
  height?: number;
};

const { width: screenWidth } = Dimensions.get('window');

export function LineChartProvider({
  children,
  data,
  gutter = 16,
  width = screenWidth,
  height = screenWidth,
}: LineChartProviderProps) {
  const currentX = useSharedValue(-1);
  const currentY = useSharedValue(-1);
  const currentIndex = useSharedValue(-1);
  const isActive = useSharedValue(false);

  const domain = React.useMemo(() => getDomain(data), [data]);

  const path = React.useMemo(() => {
    return getPath({ data, width, height, gutter });
  }, [data, gutter, height, width]);

  const contextValue = React.useMemo(
    () => ({
      currentX,
      currentY,
      currentIndex,
      data,
      gutter,
      path,
      width,
      height,
      isActive,
      domain,
    }),
    [
      currentIndex,
      currentX,
      currentY,
      data,
      domain,
      gutter,
      height,
      isActive,
      path,
      width,
    ]
  );

  return (
    <LineChartContext.Provider value={contextValue}>
      {children}
    </LineChartContext.Provider>
  );
}
