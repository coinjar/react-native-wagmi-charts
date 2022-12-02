function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { Platform, View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { LineChartCursor } from './Cursor';
import { useLineChart } from './useLineChart';
LineChartCursorCrosshair.displayName = 'LineChartCursorCrosshair';
export function LineChartCursorCrosshair({
  children,
  color = 'black',
  size = 8,
  outerSize = 32,
  crosshairWrapperProps = {},
  crosshairProps = {},
  crosshairOuterProps = {},
  ...props
}) {
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
  return /*#__PURE__*/React.createElement(LineChartCursor, _extends({
    type: "crosshair"
  }, props), /*#__PURE__*/React.createElement(Animated.View, _extends({}, crosshairWrapperProps, {
    style: [{
      width: outerSize,
      height: outerSize,
      alignItems: 'center',
      justifyContent: 'center'
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
  }))), children);
}
//# sourceMappingURL=CursorCrosshair.js.map