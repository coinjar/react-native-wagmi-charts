import * as React from 'react';
import { Dimensions } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import type { TContext, TData } from './types';
import { getDomain } from './utils';

export const CandlestickChartContext = React.createContext<TContext>({
  currentX: { value: 0 },
  currentY: { value: 0 },
  data: [],
  height: 0,
  width: 0,
  domain: [0, 0],
  step: 0,
  setHeight: () => {},
  setWidth: () => {},
});

type CandlestickChartProviderProps = {
  children: React.ReactNode;
  data: TData;
};

export const { width: screenWidth } = Dimensions.get('window');

export function CandlestickChartProvider({
  children,
  data,
}: CandlestickChartProviderProps) {
  const [width, setWidth] = React.useState(screenWidth);
  const [height, setHeight] = React.useState(screenWidth);
  const [step, setStep] = React.useState(0);
  const currentX = useSharedValue(0);
  const currentY = useSharedValue(0);

  const domain = React.useMemo(() => getDomain(data), [data]);

  React.useEffect(() => {
    const newStep = width / data.length;
    setStep(newStep);
  }, [data.length, width]);

  const contextValue = React.useMemo(
    () => ({
      currentX,
      currentY,
      data,
      width,
      height,
      domain,
      step,
      setStep,
      setHeight,
      setWidth,
    }),
    [currentX, currentY, data, domain, height, step, width]
  );

  return (
    <CandlestickChartContext.Provider value={contextValue}>
      {children}
    </CandlestickChartContext.Provider>
  );
}
