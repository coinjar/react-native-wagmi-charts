import * as React from 'react';
import { Dimensions, StyleSheet, View, ViewProps } from 'react-native';
import { LineChartContext } from './Context';
import { LineChartIdProvider, useLineChartData } from './Data';

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
  /**
   * If your `LineChart.Provider` uses a dictionary with multiple IDs for multiple paths, then this field is required.
   */
  id?: string;
  absolute?: boolean;
};

const { width: screenWidth } = Dimensions.get('window');

export function LineChart({
  children,
  yGutter = 16,
  width = screenWidth,
  height = screenWidth,
  shape,
  id,
  absolute,
  ...props
}: LineChartProps) {
  const { yDomain } = React.useContext(LineChartContext);
  const { data } = useLineChartData({
    id,
  });

  const path = React.useMemo(() => {
    if (data && data.length > 0) {
      return getPath({
        data,
        width,
        height,
        gutter: yGutter,
        shape,
        yDomain,
      });
    }
    return '';
  }, [data, width, height, yGutter, shape, yDomain]);

  const area = React.useMemo(() => {
    if (data && data.length > 0) {
      return getArea({
        data,
        width,
        height,
        gutter: yGutter,
        shape,
        yDomain,
      });
    }
    return '';
  }, [data, width, height, yGutter, shape, yDomain]);

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
    <LineChartIdProvider id={id}>
      <LineChartDimensionsContext.Provider value={contextValue}>
        <View {...props} style={[absolute && styles.absolute, props.style]}>
          {children}
        </View>
      </LineChartDimensionsContext.Provider>
    </LineChartIdProvider>
  );
}

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
  },
});
