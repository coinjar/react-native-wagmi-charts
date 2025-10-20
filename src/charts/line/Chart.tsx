import React from 'react';
import * as d3Shape from 'd3-shape';

import { Dimensions, StyleSheet, View, ViewProps } from 'react-native';
import { LineChartIdProvider, useLineChartData } from './Data';
import { Path, parse } from 'react-native-redash';
import { getArea, getPath } from './utils';

import { LineChartContext } from './Context';

export const LineChartDimensionsContext = React.createContext({
  width: 0,
  height: 0,
  pointWidth: 0,
  parsedPath: {} as Path,
  path: '',
  area: '',
  shape: d3Shape.curveBumpX,
  gutter: 0,
  pathWidth: 0,
});

export type LineChartProps = ViewProps & {
  children: React.ReactNode;
  yGutter?: number;
  width?: number;
  height?: number;
  shape?: d3Shape.CurveFactory;
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
  const { yDomain, xLength, xDomain } = React.useContext(LineChartContext);
  const { data } = useLineChartData({
    id,
  });

  // Reserve space at the bottom for x-axis cursor labels
  const X_AXIS_LABEL_RESERVED_HEIGHT = 40;
  const chartDrawingHeight = height - X_AXIS_LABEL_RESERVED_HEIGHT;

  const pathWidth = React.useMemo(() => {
    let allowedWidth = width;
    if (data && xLength > data.length) {
      allowedWidth = (width * data.length) / xLength;
    }
    return allowedWidth;
  }, [data, width, xLength]);

  const path = React.useMemo(() => {
    if (data && data.length > 0) {
      return getPath({
        data,
        width: pathWidth,
        height: chartDrawingHeight,
        gutter: yGutter,
        shape,
        yDomain,
        xDomain,
      });
    }
    return '';
  }, [data, pathWidth, chartDrawingHeight, yGutter, shape, yDomain, xDomain]);

  const area = React.useMemo(() => {
    if (data && data.length > 0) {
      return getArea({
        data,
        width: pathWidth,
        height: chartDrawingHeight,
        gutter: yGutter,
        shape,
        yDomain,
        xDomain,
      });
    }
    return '';
  }, [data, pathWidth, chartDrawingHeight, yGutter, shape, yDomain, xDomain]);

  const parsedPath = React.useMemo(() => parse(path), [path]);
  const pointWidth = React.useMemo(
    () => width / (data ? data.length - 1 : 1),
    [data, width]
  );

  const contextValue = React.useMemo(
    () => ({
      gutter: yGutter,
      parsedPath,
      pointWidth,
      area,
      path,
      width,
      height,
      pathWidth,
      shape
    }),
    [
      yGutter,
      parsedPath,
      pointWidth,
      area,
      path,
      width,
      height,
      pathWidth,
      shape,
    ]
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
