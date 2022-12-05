import * as React from 'react';
import { useLineChartPrice } from './usePrice';
import { AnimatedText } from '../../components/AnimatedText';
LineChartTrusteePriceText.displayName = 'LineChartTrusteePriceText';
export function LineChartTrusteePriceText({
  format,
  precision = 2,
  variant = 'formatted',
  style,
  currencySymbol
}) {
  const price = useLineChartPrice({
    format,
    precision,
    currencySymbol
  });
  return /*#__PURE__*/React.createElement(AnimatedText, {
    text: price[variant],
    style: style
  });
}
//# sourceMappingURL=TrusteePriceText.js.map