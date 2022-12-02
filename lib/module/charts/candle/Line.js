function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Line as SVGLine } from 'react-native-svg';
export const CandlestickChartLine = ({
  color = 'gray',
  x,
  y,
  ...props
}) => {
  return /*#__PURE__*/React.createElement(Svg, {
    style: StyleSheet.absoluteFill
  }, /*#__PURE__*/React.createElement(SVGLine, _extends({
    x1: 0,
    y1: 0,
    x2: x,
    y2: y,
    strokeWidth: 2,
    stroke: color,
    strokeDasharray: "6 6"
  }, props)));
};
//# sourceMappingURL=Line.js.map