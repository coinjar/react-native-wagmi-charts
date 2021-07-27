import * as React from 'react';
import { ReText } from 'react-native-redash';
import { usePrice } from './usePrice';
export function PriceText({
  format,
  precision = 2,
  variant = 'formatted',
  type = 'crosshair',
  ...props
}) {
  const price = usePrice({ format, precision, type });
  return React.createElement(ReText, { text: price[variant], ...props });
}
