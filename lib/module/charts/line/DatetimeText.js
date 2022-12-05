import * as React from 'react';
import { useLineChartDatetime } from './useDatetime';
import { AnimatedText } from '../../components/AnimatedText';
LineChartDatetimeText.displayName = 'LineChartDatetimeText';
export function LineChartDatetimeText({
  locale,
  options,
  format,
  variant = 'formatted',
  style,
  trustee
}) {
  const datetime = useLineChartDatetime({
    format,
    locale,
    options,
    trustee
  });
  return /*#__PURE__*/React.createElement(AnimatedText, {
    text: datetime[variant],
    style: style
  });
}
//# sourceMappingURL=DatetimeText.js.map