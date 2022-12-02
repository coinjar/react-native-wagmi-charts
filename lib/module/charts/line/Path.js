function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import Animated from 'react-native-reanimated';
import { Path } from 'react-native-svg';
import { LineChartDimensionsContext } from './Chart';
import { LineChartPathContext } from './ChartPath';
import useAnimatedPath from './useAnimatedPath';
const AnimatedPath = Animated.createAnimatedComponent(Path);
LineChartPath.displayName = 'LineChartPath';
export function LineChartPath({
  color = 'black',
  inactiveColor,
  width: strokeWidth = 3,
  ...props
}) {
  const {
    path
  } = React.useContext(LineChartDimensionsContext);
  const {
    isTransitionEnabled,
    isInactive
  } = React.useContext(LineChartPathContext); ////////////////////////////////////////////////

  const {
    animatedProps
  } = useAnimatedPath({
    enabled: isTransitionEnabled,
    path
  }); ////////////////////////////////////////////////

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AnimatedPath, _extends({
    animatedProps: animatedProps,
    fill: "transparent",
    stroke: isInactive ? inactiveColor || color : color,
    strokeOpacity: isInactive && !inactiveColor ? 0.2 : 1,
    strokeWidth: strokeWidth
  }, props)));
}
//# sourceMappingURL=Path.js.map