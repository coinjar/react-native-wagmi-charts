import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Line } from 'react-native-svg';
const LineComp = ({ color = 'gray', x, y }) => {
  return React.createElement(
    Svg,
    { style: StyleSheet.absoluteFill },
    React.createElement(Line, {
      x1: 0,
      y1: 0,
      x2: x,
      y2: y,
      strokeWidth: 2,
      stroke: color,
      strokeDasharray: '6 6',
    })
  );
};
export default LineComp;
