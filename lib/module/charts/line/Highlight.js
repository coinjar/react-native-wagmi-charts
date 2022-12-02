function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import Animated from 'react-native-reanimated';
import { Path } from 'react-native-svg';
import { LineChartDimensionsContext } from './Chart';
import { LineChartPathContext } from './ChartPath';
import useAnimatedPath from './useAnimatedPath';
import { useLineChart } from './useLineChart';
import { getPath } from './utils';
const AnimatedPath = Animated.createAnimatedComponent(Path);
LineChartHighlight.displayName = 'LineChartHighlight';
export function LineChartHighlight({
  color = 'black',
  inactiveColor,
  showInactiveColor = true,
  from,
  to,
  width: strokeWidth = 3,
  ...props
}) {
  const {
    data,
    yDomain
  } = useLineChart();
  const {
    pathWidth,
    height,
    gutter,
    shape
  } = React.useContext(LineChartDimensionsContext);
  const {
    isTransitionEnabled,
    isInactive: _isInactive
  } = React.useContext(LineChartPathContext);
  const isInactive = showInactiveColor && _isInactive; ////////////////////////////////////////////////

  const path = React.useMemo(() => {
    if (data && data.length > 0) {
      return getPath({
        data,
        from,
        to,
        width: pathWidth,
        height,
        gutter,
        shape,
        yDomain
      });
    }

    return '';
  }, [data, from, to, pathWidth, height, gutter, shape, yDomain]);
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
    strokeWidth: strokeWidth,
    strokeOpacity: isInactive && !inactiveColor ? 0.5 : 1
  }, props)));
}
//# sourceMappingURL=Highlight.js.map