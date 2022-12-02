function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { Svg } from 'react-native-svg';
import { CandlestickChartDimensionsContext } from './Chart';
import { CandlestickChartCandle } from './Candle';
import { useCandlestickChart } from './useCandlestickChart';
export function CandlestickChartCandles({
  positiveColor,
  negativeColor,
  rectProps,
  lineProps,
  margin,
  useAnimations = true,
  renderRect,
  renderLine,
  candleProps,
  ...props
}) {
  const {
    width,
    height
  } = React.useContext(CandlestickChartDimensionsContext);
  const {
    data,
    domain,
    step
  } = useCandlestickChart(); ////////////////////////////////////////////////

  return /*#__PURE__*/React.createElement(Svg, _extends({
    width: width,
    height: height
  }, props), step > 0 && data.map((candle, index) => /*#__PURE__*/React.createElement(CandlestickChartCandle, _extends({
    key: index,
    domain: domain,
    margin: margin,
    maxHeight: height,
    width: step,
    positiveColor: positiveColor,
    negativeColor: negativeColor,
    renderRect: renderRect,
    renderLine: renderLine,
    rectProps: rectProps,
    lineProps: lineProps,
    useAnimations: useAnimations,
    candle: candle,
    index: index
  }, candleProps))));
}
//# sourceMappingURL=Candles.js.map