import * as React from 'react';
import { useCandlestickChartDatetime } from './useDatetime';
import { AnimatedText } from '../../components/AnimatedText';
export function CandlestickChartDatetimeText({
  locale,
  options,
  format,
  variant = 'formatted',
  style
}) {
  const datetime = useCandlestickChartDatetime({
    format,
    locale,
    options
  });
  return /*#__PURE__*/React.createElement(AnimatedText, {
    text: datetime[variant],
    style: style
  });
}
//# sourceMappingURL=DatetimeText.js.map