import * as React from 'react';
import { Dimensions, View, ViewProps } from 'react-native';

import { useLineChart } from './useLineChart';
import { getPath } from './utils';

export const LineChartDimensionsContext = React.createContext({
  width: 0,
  height: 0,
  path: '',
  gutter: 0,
});

type LineChartProps = ViewProps & {
  children: React.ReactNode;
  yGutter?: number;
  width?: number;
  height?: number;
  shape?: any;
};

const { width: screenWidth } = Dimensions.get('window');

export function LineChart({
  children,
  yGutter = 16,
  width = screenWidth,
  height = screenWidth,
  shape,
  ...props
}: LineChartProps) {
  const { data } = useLineChart();

  const path = React.useMemo(() => {
    return getPath({ data, width, height, gutter: yGutter, shape });
  }, [data, width, height, yGutter, shape]);

  const contextValue = React.useMemo(
    () => ({
      gutter: yGutter,
      path,
      width,
      height,
    }),
    [height, path, width, yGutter]
  );

  return (
    <LineChartDimensionsContext.Provider value={contextValue}>
      <View {...props}>{children}</View>
    </LineChartDimensionsContext.Provider>
  );
}
