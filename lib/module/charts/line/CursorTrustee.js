function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useAnimatedProps, withSpring } from 'react-native-reanimated';
import Svg, { Line as SVGLine } from 'react-native-svg';
import { LineChartCursor } from './Cursor';
import { LineChartDimensionsContext } from './Chart';
import { useLineChart } from './useLineChart';
LineChartCursorTrustee.displayName = 'LineChartCursorTrustee';
const AnimatedSvgLine = Animated.createAnimatedComponent(SVGLine);
export function LineChartCursorTrustee({
  children,
  color = 'black',
  horizontalLineColor = 'green',
  verticalLineColor = 'orange',
  size = 8,
  outerSize = 32,
  crosshairWrapperProps = {},
  crosshairProps = {},
  crosshairOuterProps = {},
  lineVerticalProps = {},
  lineHorizontalProps = {},
  ...props
}) {
  const {
    height,
    width
  } = React.useContext(LineChartDimensionsContext);
  const {
    currentX,
    currentY,
    isActive
  } = useLineChart(); // It seems that enabling spring animation on initial render on Android causes a crash.

  const [enableSpringAnimation, setEnableSpringAnimation] = React.useState(Platform.OS === 'ios');
  React.useEffect(() => {
    setTimeout(() => {
      setEnableSpringAnimation(true);
    }, 100);
  }, []);
  const animatedCursorStyle = useAnimatedStyle(() => ({
    transform: [{
      translateX: currentX.value - outerSize / 2
    }, {
      translateY: currentY.value - outerSize / 2
    }, {
      scale: enableSpringAnimation ? withSpring(isActive.value ? 1 : 0, {
        damping: 10
      }) : 0
    }]
  }));
  const horizontal = useAnimatedStyle(() => ({
    opacity: isActive.value ? 1 : 0,
    transform: [{
      translateY: currentY.value
    }]
  }));
  const vertical = useAnimatedStyle(() => ({
    opacity: isActive.value ? 1 : 0,
    transform: [{
      translateX: currentX.value
    }]
  }));
  const vertical2 = useAnimatedProps(() => ({
    y1: currentY.value || 0
  }));
  return /*#__PURE__*/React.createElement(LineChartCursor, _extends({
    type: "trustee"
  }, props), /*#__PURE__*/React.createElement(Animated.View, _extends({}, crosshairWrapperProps, {
    style: [{
      width: outerSize,
      height: outerSize,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 5
    }, animatedCursorStyle, crosshairWrapperProps.style]
  }), /*#__PURE__*/React.createElement(View, _extends({}, crosshairOuterProps, {
    style: [{
      backgroundColor: color,
      width: outerSize,
      height: outerSize,
      borderRadius: outerSize,
      opacity: 0.1,
      position: 'absolute'
    }, crosshairOuterProps.style]
  })), /*#__PURE__*/React.createElement(View, _extends({}, crosshairProps, {
    style: [{
      backgroundColor: color,
      width: size,
      height: size,
      borderRadius: size
    }, crosshairProps.style]
  }))), /*#__PURE__*/React.createElement(Animated.View, {
    style: [horizontal, { ...StyleSheet.absoluteFillObject,
      width: width
    }]
  }, /*#__PURE__*/React.createElement(Svg, null, /*#__PURE__*/React.createElement(SVGLine, _extends({
    x1: 0,
    y1: 0,
    x2: width,
    y2: 0,
    strokeWidth: 2,
    stroke: horizontalLineColor
  }, lineHorizontalProps)))), /*#__PURE__*/React.createElement(Animated.View, {
    style: [vertical, { ...StyleSheet.absoluteFillObject
    }]
  }, /*#__PURE__*/React.createElement(Svg, null, /*#__PURE__*/React.createElement(AnimatedSvgLine, _extends({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: height,
    strokeWidth: 2,
    stroke: verticalLineColor,
    animatedProps: vertical2
  }, lineVerticalProps)))), children);
}
//# sourceMappingURL=CursorTrustee.js.map