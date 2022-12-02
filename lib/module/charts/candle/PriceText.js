import * as React from 'react';
import { useCandlestickChartPrice } from './usePrice';
import { AnimatedText } from '../../components/AnimatedText';
export function CandlestickChartPriceText({
  format,
  precision = 2,
  variant = 'formatted',
  type = 'crosshair',
  style
}) {
  const price = useCandlestickChartPrice({
    format,
    precision,
    type
  });
  return /*#__PURE__*/React.createElement(AnimatedText, {
    text: price[variant],
    style: style
  });
}
//# sourceMappingURL=PriceText.js.map