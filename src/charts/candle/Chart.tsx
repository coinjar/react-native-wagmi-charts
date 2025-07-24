import * as React from 'react';
import { Dimensions, View, ViewProps } from 'react-native';
import dayjs from 'dayjs';

import { useCandlestickChart } from './useCandlestickChart';

export const CandlestickChartDimensionsContext = React.createContext({
  width: 0,
  height: 0,
});

type CandlestickChartProps = ViewProps & {
  children: React.ReactNode;
  width?: number;
  height?: number;
  initialTargetDate?: string;
};

const { width: screenWidth } = Dimensions.get('window');

export function CandlestickChart({
  children,
  width = screenWidth,
  height = screenWidth,
  initialTargetDate,
  ...props
}: CandlestickChartProps) {
  const { setWidth, setHeight, setCurrentIndex, data } = useCandlestickChart();

  React.useEffect(() => {
    setWidth(width);
    setHeight(height);
  }, [height, setHeight, setWidth, width]);

  // Automatically set the current index based on the initial target date
  React.useEffect(() => {
    if (!initialTargetDate || !data?.length) return;

    const targetUnix = dayjs(initialTargetDate).unix();

    const index = data.findIndex((item) => item.timestamp === targetUnix);

    if (index !== -1 && setCurrentIndex) {
      setCurrentIndex(index);
    }
  }, [initialTargetDate, data]);

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
