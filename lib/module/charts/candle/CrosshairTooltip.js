function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue } from 'react-native-reanimated';
import { CandlestickChartDimensionsContext } from './Chart';
import { useCandlestickChart } from './useCandlestickChart';
import { CandlestickChartPriceText } from './PriceText';
export const CandlestickChartCrosshairTooltipContext = /*#__PURE__*/React.createContext({
  position: {
    value: 'left'
  }
});
export function CandlestickChartCrosshairTooltip({
  children,
  xGutter = 8,
  yGutter = 8,
  tooltipTextProps,
  textStyle,
  ...props
}) {
  const {
    width,
    height
  } = React.useContext(CandlestickChartDimensionsContext);
  const {
    currentY
  } = useCandlestickChart();
  const {
    position
  } = React.useContext(CandlestickChartCrosshairTooltipContext);
  const elementHeight = useSharedValue(0);
  const elementWidth = useSharedValue(0);
  const handleLayout = React.useCallback(event => {
    elementHeight.value = event.nativeEvent.layout.height;
    elementWidth.value = event.nativeEvent.layout.width;
  }, [elementHeight, elementWidth]);
  const topOffset = useDerivedValue(() => {
    let offset = 0;

    if (currentY.value < elementHeight.value / 2 + yGutter) {
      offset = currentY.value - (elementHeight.value / 2 + yGutter);
    } else if (currentY.value + elementHeight.value / 2 > height - yGutter) {
      offset = currentY.value + elementHeight.value / 2 - height + yGutter;
    }

    return offset;
  });
  const tooltip = useAnimatedStyle(() => ({
    backgroundColor: 'white',
    position: 'absolute',
    display: 'flex',
    padding: 4
  }));
  const leftTooltip = useAnimatedStyle(() => ({
    left: xGutter,
    top: -(elementHeight.value / 2) - topOffset.value,
    opacity: position.value === 'left' ? 1 : 0
  }));
  const rightTooltip = useAnimatedStyle(() => ({
    left: width - elementWidth.value - xGutter,
    top: -(elementHeight.value / 2) - topOffset.value,
    opacity: position.value === 'right' ? 1 : 0
  }));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Animated.View, _extends({
    onLayout: handleLayout
  }, props, {
    style: [tooltip, leftTooltip, props.style]
  }), children || /*#__PURE__*/React.createElement(CandlestickChartPriceText, _extends({}, tooltipTextProps, {
    style: [styles.text, tooltipTextProps === null || tooltipTextProps === void 0 ? void 0 : tooltipTextProps.style, textStyle]
  }))), /*#__PURE__*/React.createElement(Animated.View, _extends({}, props, {
    style: [tooltip, rightTooltip, props.style]
  }), children || /*#__PURE__*/React.createElement(CandlestickChartPriceText, _extends({}, tooltipTextProps, {
    style: [styles.text, tooltipTextProps === null || tooltipTextProps === void 0 ? void 0 : tooltipTextProps.style, textStyle]
  }))));
}
const styles = StyleSheet.create({
  text: {
    fontSize: 14
  }
});
//# sourceMappingURL=CrosshairTooltip.js.map