import * as React from 'react';
import { Dimensions, View, ViewProps } from 'react-native';

import { useCandlestickChart } from './useCandlestickChart';

export const CandlestickChartDimensionsContext = React.createContext({
  width: 0,
  height: 0,
});

type CandlestickChartProps = ViewProps & {
  children: React.ReactNode;
  yGutter?: number;
  width?: number;
  height?: number;
  shape?: any;
};

const { width: screenWidth } = Dimensions.get('window');

export function CandlestickChart({
  children,
  width = screenWidth,
  height = screenWidth,
  ...props
}: CandlestickChartProps) {
  const { setWidth, setHeight } = useCandlestickChart();

  React.useEffect(() => {
    setWidth(width);
    setHeight(height);
  }, [height, setHeight, setWidth, width]);

  const contextValue = React.useMemo(
    () => ({
      width,
      height,
    }),
    [height, width]
  );

  return (
    <CandlestickChartDimensionsContext.Provider value={contextValue}>
      <View {...props}>{children}</View>
    </CandlestickChartDimensionsContext.Provider>
  );
}
