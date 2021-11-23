import * as React from 'react';
// @ts-ignore
import * as d3Shape from 'd3-shape';
import { Dimensions, StyleSheet, View, ViewProps } from 'react-native';
import { LineChartContext } from './Context';
import { LineChartIdProvider, useLineChartData } from './Data';

import { getArea, getPath } from './utils';

export const LineChartDimensionsContext = React.createContext({
  width: 0,
  height: 0,
  path: '',
  area: '',
  shape: d3Shape.curveBumpX,
  gutter: 0,
  pathWidth: 0,
});

type LineChartProps = ViewProps & {
  children: React.ReactNode;
  yGutter?: number;
  width?: number;
  height?: number;
  shape?: unknown;
  /**
   * If your `LineChart.Provider` uses a dictionary with multiple IDs for multiple paths, then this field is required.
   */
  id?: string;
  absolute?: boolean;
};

const { width: screenWidth } = Dimensions.get('window');

LineChart.displayName = 'LineChart';

export function LineChart({
  children,
  yGutter = 16,
  width = screenWidth,
  height = screenWidth,
  shape = d3Shape.curveBumpX,
  id,
  absolute,
  ...props
}: LineChartProps) {
  const { yDomain, xLength } = React.useContext(LineChartContext);
  const { data } = useLineChartData({
    id,
  });

  const pathWidth = React.useMemo(() => {
    let allowedWidth = width;
    if (xLength > data.length) {
      allowedWidth = (width * data.length) / xLength;
    }
    return allowedWidth;
  }, [data.length, width, xLength]);

  const path = React.useMemo(() => {
    if (data && data.length > 0) {
      return getPath({
        data,
        width: pathWidth,
        height,
        gutter: yGutter,
        shape,
        yDomain,
      });
    }
    return '';
  }, [data, pathWidth, height, yGutter, shape, yDomain]);

  const area = React.useMemo(() => {
    if (data && data.length > 0) {
      return getArea({
        data,
        width: pathWidth,
        height,
        gutter: yGutter,
        shape,
        yDomain,
      });
    }
    return '';
  }, [data, pathWidth, height, yGutter, shape, yDomain]);

  const contextValue = React.useMemo(
    () => ({
      gutter: yGutter,
      area,
      path,
      width,
      height,
      pathWidth,
      shape,
    }),
    [yGutter, area, path, width, height, pathWidth, shape]
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
