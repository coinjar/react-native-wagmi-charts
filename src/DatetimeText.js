import * as React from 'react';
import { ReText } from 'react-native-redash';
import { useDatetime } from './useDatetime';
export function DatetimeText({
  locale,
  options,
  format,
  variant = 'formatted',
  ...props
}) {
  const datetime = useDatetime({ format, locale, options });
  return React.createElement(ReText, { text: datetime[variant], ...props });
}
