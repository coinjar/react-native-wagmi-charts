function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { LineChartDimensionsContext } from './Chart';
import { CursorContext } from './Cursor';
import { LineChartPriceText } from './PriceText';
import { useLineChart } from './useLineChart';
LineChartTooltip.displayName = 'LineChartTooltip';
export function LineChartTooltip({
  children,
  xGutter = 8,
  yGutter = 8,
  cursorGutter = 48,
  position = 'top',
  textProps,
  textStyle,
  ...props
}) {
  const {
    width,
    height
  } = React.useContext(LineChartDimensionsContext);
  const {
    type
  } = React.useContext(CursorContext);
  const {
    currentX,
    currentY,
    isActive
  } = useLineChart();
  const x = useSharedValue(0);
  const elementWidth = useSharedValue(0);
  const elementHeight = useSharedValue(0);
  const handleLayout = React.useCallback(event => {
    x.value = event.nativeEvent.layout.x;
    elementWidth.value = event.nativeEvent.layout.width;
    elementHeight.value = event.nativeEvent.layout.height;
  }, [elementHeight, elementWidth, x]);
  const animatedCursorStyle = useAnimatedStyle(() => {
    let translateXOffset = elementWidth.value / 2;

    if (currentX.value < elementWidth.value / 2 + xGutter) {
      const xOffset = elementWidth.value / 2 + xGutter - currentX.value;
      translateXOffset = translateXOffset - xOffset;
    }

    if (currentX.value > width - elementWidth.value / 2 - xGutter) {
      const xOffset = currentX.value - (width - elementWidth.value / 2 - xGutter);
      translateXOffset = translateXOffset + xOffset;
    }

    let translateYOffset = 0;

    if (position === 'top') {
      translateYOffset = elementHeight.value / 2 + cursorGutter;

      if (currentY.value - translateYOffset < yGutter) {
        translateYOffset = currentY.value - yGutter;
      }
    } else if (position === 'bottom') {
      translateYOffset = -(elementHeight.value / 2) - cursorGutter / 2;

      if (currentY.value - translateYOffset + elementHeight.value > height - yGutter) {
        translateYOffset = currentY.value - (height - yGutter) + elementHeight.value;
      }
    }

    return {
      transform: [{
        translateX: currentX.value - translateXOffset
      }, {
        translateY: type === 'crosshair' || type === 'trustee' ? currentY.value - translateYOffset : position === 'top' ? yGutter : height - elementHeight.value - yGutter
      }],
      opacity: isActive.value ? 1 : 0
    };
  });
  return /*#__PURE__*/React.createElement(Animated.View, _extends({
    onLayout: handleLayout
  }, props, {
    style: [{
      position: 'absolute',
      padding: 4,
      alignSelf: 'flex-start'
    }, animatedCursorStyle, props.style]
  }), children || /*#__PURE__*/React.createElement(LineChartPriceText, _extends({
    style: [textStyle]
  }, textProps)));
}
//# sourceMappingURL=Tooltip.js.map