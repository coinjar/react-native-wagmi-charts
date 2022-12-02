function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import Svg, { Line as SVGLine } from 'react-native-svg';
import { LineChartDimensionsContext } from './Chart';
import { LineChartCursor } from './Cursor';
import { useLineChart } from './useLineChart';
LineChartCursorLine.displayName = 'LineChartCursorLine';
export function LineChartCursorLine({
  children,
  color = 'gray',
  lineProps = {}
}) {
  const {
    height
  } = React.useContext(LineChartDimensionsContext);
  const {
    currentX,
    isActive
  } = useLineChart();
  const vertical = useAnimatedStyle(() => ({
    opacity: isActive.value ? 1 : 0,
    height: '100%',
    transform: [{
      translateX: currentX.value
    }]
  }));
  return /*#__PURE__*/React.createElement(LineChartCursor, {
    type: "line"
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: vertical
  }, /*#__PURE__*/React.createElement(Svg, {
    style: styles.svg
  }, /*#__PURE__*/React.createElement(SVGLine, _extends({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: height,
    strokeWidth: 2,
    stroke: color,
    strokeDasharray: "3 3"
  }, lineProps)))), children);
}
const styles = StyleSheet.create({
  svg: { ...StyleSheet.absoluteFillObject,
    // height: 100% is required for <svg /> on web
    height: '100%'
  }
});
//# sourceMappingURL=CursorLine.js.map