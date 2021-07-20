import * as React from 'react';
import { ReText } from 'react-native-redash';

import { useCurrentPrice } from './useCurrentPrice';

type CurrentPriceTextProps = {
  format?: any;
  precision?: number;
  variant?: 'formatted' | 'float';
};

export function CurrentPriceText({
  format,
  precision = 2,
  variant = 'formatted',
  ...props
}: CurrentPriceTextProps) {
  const price = useCurrentPrice({ format, precision });
  return <ReText text={price[variant]} {...props} />;
}
