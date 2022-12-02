function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Svg } from 'react-native-svg';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import flattenChildren from 'react-keyed-flatten-children';
import { LineChartDimensionsContext } from './Chart';
import { LineChartPath } from './Path';
import { useLineChart } from './useLineChart';
const BACKGROUND_COMPONENTS = ['LineChartHighlight', 'LineChartHorizontalLine', 'LineChartGradient', 'LineChartDot'];
const FOREGROUND_COMPONENTS = ['LineChartHighlight', 'LineChartDot'];
const AnimatedSVG = Animated.createAnimatedComponent(Svg);
export const LineChartPathContext = /*#__PURE__*/React.createContext({
  color: '',
  isInactive: false,
  isTransitionEnabled: true
});
LineChartPathWrapper.displayName = 'LineChartPathWrapper';
export function LineChartPathWrapper({
  animationDuration = 300,
  animationProps = {},
  children,
  color = 'black',
  inactiveColor,
  width: strokeWidth = 3,
  widthOffset = 20,
  pathProps = {},
  showInactivePath = true,
  animateOnMount,
  mountAnimationDuration = animationDuration,
  mountAnimationProps = animationProps
}) {
  var _pathProps$isTransiti, _pathProps$isTransiti2;

  const {
    height,
    pathWidth,
    width
  } = React.useContext(LineChartDimensionsContext);
  const {
    currentX,
    isActive
  } = useLineChart();
  const isMounted = useSharedValue(false);
  const hasMountedAnimation = useSharedValue(false);
  React.useEffect(() => {
    isMounted.value = true; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); ////////////////////////////////////////////////

  const svgProps = useAnimatedProps(() => {
    const shouldAnimateOnMount = animateOnMount === 'foreground';
    const inactiveWidth = !isMounted.value && shouldAnimateOnMount ? 0 : pathWidth;
    let duration = shouldAnimateOnMount && !hasMountedAnimation.value ? mountAnimationDuration : animationDuration;
    const props = shouldAnimateOnMount && !hasMountedAnimation.value ? mountAnimationProps : animationProps;

    if (isActive.value) {
      duration = 0;
    }

    return {
      width: withTiming(isActive.value ? // on Web, <svg /> elements don't support negative widths
      // https://github.com/coinjar/react-native-wagmi-charts/issues/24#issuecomment-955789904
      Math.max(currentX.value, 0) : inactiveWidth + widthOffset, Object.assign({
        duration
      }, props), () => {
        hasMountedAnimation.value = true;
      })
    };
  });
  const viewSize = React.useMemo(() => ({
    width,
    height
  }), [width, height]); ////////////////////////////////////////////////

  let backgroundChildren;
  let foregroundChildren;

  if (children) {
    const iterableChildren = flattenChildren(children);
    backgroundChildren = iterableChildren.filter(child => {
      var _child$type;

      return (// @ts-ignore
        BACKGROUND_COMPONENTS.includes(child === null || child === void 0 ? void 0 : (_child$type = child.type) === null || _child$type === void 0 ? void 0 : _child$type.displayName)
      );
    });
    foregroundChildren = iterableChildren.filter(child => {
      var _child$type2;

      return (// @ts-ignore
        FOREGROUND_COMPONENTS.includes(child === null || child === void 0 ? void 0 : (_child$type2 = child.type) === null || _child$type2 === void 0 ? void 0 : _child$type2.displayName)
      );
    });
  } ////////////////////////////////////////////////


  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(LineChartPathContext.Provider, {
    value: {
      color,
      isInactive: showInactivePath,
      isTransitionEnabled: (_pathProps$isTransiti = pathProps.isTransitionEnabled) !== null && _pathProps$isTransiti !== void 0 ? _pathProps$isTransiti : true
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: viewSize
  }, /*#__PURE__*/React.createElement(Svg, {
    width: width,
    height: height
  }, /*#__PURE__*/React.createElement(LineChartPath, _extends({
    color: color,
    inactiveColor: inactiveColor,
    width: strokeWidth
  }, pathProps)), backgroundChildren))), /*#__PURE__*/React.createElement(LineChartPathContext.Provider, {
    value: {
      color,
      isInactive: false,
      isTransitionEnabled: (_pathProps$isTransiti2 = pathProps.isTransitionEnabled) !== null && _pathProps$isTransiti2 !== void 0 ? _pathProps$isTransiti2 : true
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: StyleSheet.absoluteFill
  }, /*#__PURE__*/React.createElement(AnimatedSVG, {
    animatedProps: svgProps,
    height: height
  }, /*#__PURE__*/React.createElement(LineChartPath, _extends({
    color: color,
    width: strokeWidth
  }, pathProps)), foregroundChildren))));
}
//# sourceMappingURL=ChartPath.js.map