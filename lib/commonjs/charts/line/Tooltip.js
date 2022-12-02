"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineChartTooltip = LineChartTooltip;

var React = _interopRequireWildcard(require("react"));

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _Chart = require("./Chart");

var _Cursor = require("./Cursor");

var _PriceText = require("./PriceText");

var _useLineChart = require("./useLineChart");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

LineChartTooltip.displayName = 'LineChartTooltip';

function LineChartTooltip({
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
  } = React.useContext(_Chart.LineChartDimensionsContext);
  const {
    type
  } = React.useContext(_Cursor.CursorContext);
  const {
    currentX,
    currentY,
    isActive
  } = (0, _useLineChart.useLineChart)();
  const x = (0, _reactNativeReanimated.useSharedValue)(0);
  const elementWidth = (0, _reactNativeReanimated.useSharedValue)(0);
  const elementHeight = (0, _reactNativeReanimated.useSharedValue)(0);
  const handleLayout = React.useCallback(event => {
    x.value = event.nativeEvent.layout.x;
    elementWidth.value = event.nativeEvent.layout.width;
    elementHeight.value = event.nativeEvent.layout.height;
  }, [elementHeight, elementWidth, x]);
  const animatedCursorStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
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
  return /*#__PURE__*/React.createElement(_reactNativeReanimated.default.View, _extends({
    onLayout: handleLayout
  }, props, {
    style: [{
      position: 'absolute',
      padding: 4,
      alignSelf: 'flex-start'
    }, animatedCursorStyle, props.style]
  }), children || /*#__PURE__*/React.createElement(_PriceText.LineChartPriceText, _extends({
    style: [textStyle]
  }, textProps)));
}
//# sourceMappingURL=Tooltip.js.map