function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react'; // @ts-ignore

import * as d3Shape from 'd3-shape';
import { Dimensions, StyleSheet, View } from 'react-native';
import { LineChartContext } from './Context';
import { LineChartIdProvider, useLineChartData } from './Data';
import { getArea, getPath } from './utils';
export const LineChartDimensionsContext = /*#__PURE__*/React.createContext({
  width: 0,
  height: 0,
  path: '',
  area: '',
  shape: d3Shape.curveBumpX,
  gutter: 0,
  pathWidth: 0
});
const {
  width: screenWidth
} = Dimensions.get('window');
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
}) {
  const {
    yDomain,
    xLength
  } = React.useContext(LineChartContext);
  const {
    data
  } = useLineChartData({
    id
  });
  const pathWidth = React.useMemo(() => {
    let allowedWidth = width;

    if (xLength > data.length) {
      allowedWidth = width * data.length / xLength;
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
        yDomain
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
        yDomain
      });
    }

    return '';
  }, [data, pathWidth, height, yGutter, shape, yDomain]);
  const contextValue = React.useMemo(() => ({
    gutter: yGutter,
    area,
    path,
    width,
    height,
    pathWidth,
    shape
  }), [yGutter, area, path, width, height, pathWidth, shape]);
  return /*#__PURE__*/React.createElement(LineChartIdProvider, {
    id: id
  }, /*#__PURE__*/React.createElement(LineChartDimensionsContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(View, _extends({}, props, {
    style: [absolute && styles.absolute, props.style]
  }), children)));
}
const styles = StyleSheet.create({
  absolute: {
    position: 'absolute'
  }
});
//# sourceMappingURL=Chart.js.map