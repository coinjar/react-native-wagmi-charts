import * as React from 'react';
import { Dimensions, View, ViewProps } from 'react-native';
import type { YRange } from './types';

import { useLineChart } from './useLineChart';
import { getArea, getPath } from './utils';

export const LineChartDimensionsContext = React.createContext({
  width: 0,
  height: 0,
  path: '',
  area: '',
  gutter: 0,
});

type LineChartProps = ViewProps & {
  children: React.ReactNode;
  yGutter?: number;
  width?: number;
  height?: number;
  shape?: string;
  yRange?: YRange;
};

const { width: screenWidth } = Dimensions.get('window');

export function LineChart({
  children,
  yGutter = 16,
  width = screenWidth,
  height = screenWidth,
  shape,
  yRange: yRange,
  ...props
}: LineChartProps) {
  const { data } = useLineChart();

  const yRangeMin = yRange?.min;
  const yRangeMax = yRange?.max;

  const path = React.useMemo(() => {
    if (data && data.length > 0) {
      return getPath({
        data,
        width,
        height,
        gutter: yGutter,
        shape,
        yRange: {
          min: yRangeMin,
          max: yRangeMax,
        },
      });
    }
    return '';
  }, [data, width, height, yGutter, shape, yRangeMin, yRangeMax]);

  const area = React.useMemo(() => {
    if (data && data.length > 0) {
      return getArea({
        data,
        width,
        height,
        gutter: yGutter,
        shape,
        yRange: {
          min: yRangeMin,
          max: yRangeMax,
        },
      });
    }
    return '';
  }, [data, width, height, yGutter, shape, yRangeMin, yRangeMax]);

  const contextValue = React.useMemo(
    () => ({
      gutter: yGutter,
      area,
      path,
      width,
      height,
    }),
    [area, height, path, width, yGutter]
  );

  return (
    <LineChartDimensionsContext.Provider value={contextValue}>
      <View {...props}>{children}</View>
    </LineChartDimensionsContext.Provider>
  );
}
