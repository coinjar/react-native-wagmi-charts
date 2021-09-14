import * as React from 'react';
import { useSharedValue } from 'react-native-reanimated';

import type { TContext, TData } from './types';
import { getDomain } from './utils';

export const CandlestickChartContext = React.createContext<TContext>({
  currentX: { value: -1 },
  currentY: { value: -1 },
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
  width?: number;
  height?: number;
};

export function CandlestickChartProvider({
  children,
  data = [],
}: CandlestickChartProviderProps) {
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const [step, setStep] = React.useState(0);
  const currentX = useSharedValue(-1);
  const currentY = useSharedValue(-1);

  const domain = React.useMemo(() => getDomain(data), [data]);

  React.useEffect(() => {
    if (data.length) {
      const newStep = width / data.length;
      setStep(newStep);
    }
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
      setWidth,
      setHeight,
      setStep,
    }),
    [currentX, currentY, data, domain, height, step, width]
  );

  return (
    <CandlestickChartContext.Provider value={contextValue}>
      {children}
    </CandlestickChartContext.Provider>
  );
}
