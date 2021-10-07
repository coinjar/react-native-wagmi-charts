import * as React from 'react';
import { ReText } from 'react-native-redash';
import type { TextProps as RNTextProps } from 'react-native';
import type Animated from 'react-native-reanimated';
import type { TFormatterFn, TPriceType } from './types';

import { useCandlestickChartPrice } from './usePrice';

export type CandlestickChartPriceTextProps = {
  format?: TFormatterFn<string>;
  precision?: number;
  variant?: 'formatted' | 'value';
  type?: TPriceType;
  style?: Animated.AnimateProps<RNTextProps>['style'];
};

export function CandlestickChartPriceText({
  format,
  precision = 2,
  variant = 'formatted',
  type = 'crosshair',
  ...props
}: CandlestickChartPriceTextProps) {
  const price = useCandlestickChartPrice({ format, precision, type });
  return <ReText text={price[variant]} {...props} />;
}
