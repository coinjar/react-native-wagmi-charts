import * as React from 'react';
// @ts-ignore
import * as d3Shape from 'd3-shape';
import { Dimensions, StyleSheet, View, ViewProps } from 'react-native';
import { LineChartContext } from './Context';
import { LineChartIdProvider, useLineChartData } from './Data';

import {getArea, getPath, smoothData} from './utils';
import { parse, Path } from 'react-native-redash';

export const LineChartDimensionsContext = React.createContext({
  width: 0,
  height: 0,
  pointWidth: 0,
  parsedPath: {} as Path,
  path: '',
  smoothedParsedPath: {} as Path,
  smoothedPath: '',
  area: '',
  smoothedArea: '',
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
  smoothDataRadius?: number;
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
  smoothDataRadius,
  ...props
}: LineChartProps) {
  const { yDomain, xLength, xDomain } = React.useContext(LineChartContext);
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
        xDomain,
        isOriginalData: true,
      });
    }
    return '';
  }, [data, pathWidth, height, yGutter, shape, yDomain, xDomain]);

  const smoothedPath = React.useMemo(() => {
    if (data && data.length > 0) {
      const radius = smoothDataRadius ? smoothDataRadius : 2;
      return getPath({
        data: smoothData(data, radius),
        width: pathWidth,
        height,
        gutter: yGutter,
        shape,
        yDomain,
        xDomain,
        isOriginalData: false,
      });
    }
    return '';
  }, [
    data,
    smoothDataRadius,
    pathWidth,
    height,
    yGutter,
    shape,
    yDomain,
    xDomain,
  ]);

  const area = React.useMemo(() => {
    if (data && data.length > 0) {
      return getArea({
        data,
        width: pathWidth,
        height,
        gutter: yGutter,
        shape,
        yDomain,
        isOriginalData: true,
      });
    }
    return '';
  }, [data, pathWidth, height, yGutter, shape, yDomain]);

  const smoothedArea = React.useMemo(() => {
    if (data && data.length > 0) {
      const radius = smoothDataRadius ? smoothDataRadius : 2;
      return getArea({
        data: smoothData(data, radius),
        width: pathWidth,
        height,
        gutter: yGutter,
        shape,
        yDomain,
        isOriginalData: false,
      });
    }
    return '';
  }, [data, pathWidth, height, yGutter, shape, yDomain, smoothDataRadius]);

  const dataLength = data.length;
  const parsedPath = React.useMemo(() => parse(path), [path]);
  const smoothedParsedPath = React.useMemo(() => parse(smoothedPath), [smoothedPath]);
  const pointWidth = React.useMemo(
    () => width / (dataLength - 1),
    [dataLength, width]
  );

  const contextValue = React.useMemo(
    () => ({
      gutter: yGutter,
      parsedPath,
      smoothedParsedPath,
      pointWidth,
      area,
      smoothedArea,
      path,
      smoothedPath,
      width,
      height,
      pathWidth,
      shape,
    }),
    [
      yGutter,
      parsedPath,
      smoothedParsedPath,
      pointWidth,
      area,
      smoothedArea,
      path,
      smoothedPath,
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
