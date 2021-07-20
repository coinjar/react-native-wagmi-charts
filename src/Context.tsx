import * as React from 'react';
import { Dimensions, View } from 'react-native';

import type { TContext, TData } from './types';
import { getDomain } from './utils';

export const CandlestickChartContext = React.createContext<TContext>({
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
  ...props
}: CandlestickChartProviderProps) {
  const [width, setWidth] = React.useState(screenWidth);
  const [height, setHeight] = React.useState(screenWidth);
  const [step, setStep] = React.useState(0);

  const domain = getDomain(data);

  React.useEffect(() => {
    const newStep = width / data.length;
    setStep(newStep);
  }, [data.length, width]);

  const contextValue = React.useMemo(
    () => ({
      data,
      width,
      height,
      domain,
      step,
      setStep,
      setHeight,
      setWidth,
    }),
    [data, domain, height, step, width]
  );

  return (
    <CandlestickChartContext.Provider value={contextValue}>
      <View {...props}>{children}</View>
    </CandlestickChartContext.Provider>
  );
}
