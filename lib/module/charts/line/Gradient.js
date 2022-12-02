function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import Animated from 'react-native-reanimated';
import { Defs, LinearGradient, Stop, Path } from 'react-native-svg';
import { LineChartDimensionsContext } from './Chart';
import { LineChartPathContext } from './ChartPath';
import useAnimatedPath from './useAnimatedPath';
const AnimatedPath = Animated.createAnimatedComponent(Path);
let id = 0;
LineChartGradient.displayName = 'LineChartGradient';
export function LineChartGradient({
  color: overrideColor = undefined,
  children,
  ...props
}) {
  const {
    area
  } = React.useContext(LineChartDimensionsContext);
  const {
    color: contextColor,
    isTransitionEnabled
  } = React.useContext(LineChartPathContext);
  const color = overrideColor || contextColor; ////////////////////////////////////////////////

  const {
    animatedProps
  } = useAnimatedPath({
    enabled: isTransitionEnabled,
    path: area
  }); ////////////////////////////////////////////////

  const localId = React.useRef(++id); ////////////////////////////////////////////////

  return /*#__PURE__*/React.createElement(React.Fragment, null, children ? /*#__PURE__*/React.createElement(Defs, null, /*#__PURE__*/React.createElement(LinearGradient, {
    id: `${localId.current}`,
    x1: "0",
    x2: "0",
    y1: "0",
    y2: "100%"
  }, children)) : /*#__PURE__*/React.createElement(Defs, null, /*#__PURE__*/React.createElement(LinearGradient, {
    id: `${localId.current}`,
    x1: "0",
    x2: "0",
    y1: "0",
    y2: "100%"
  }, /*#__PURE__*/React.createElement(Stop, {
    offset: "20%",
    stopColor: color,
    stopOpacity: 0.15
  }), /*#__PURE__*/React.createElement(Stop, {
    offset: "40%",
    stopColor: color,
    stopOpacity: 0.05
  }), /*#__PURE__*/React.createElement(Stop, {
    offset: "100%",
    stopColor: color,
    stopOpacity: 0
  }))), /*#__PURE__*/React.createElement(AnimatedPath, _extends({
    animatedProps: animatedProps,
    fill: `url(#${localId.current})`
  }, props)));
}
//# sourceMappingURL=Gradient.js.map