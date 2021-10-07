import * as React from 'react';
import { ReText } from 'react-native-redash';
import type { TextProps as RNTextProps } from 'react-native';
import type Animated from 'react-native-reanimated';

import { useCandlestickChartDatetime } from './useDatetime';
import type { TFormatterFn } from 'react-native-wagmi-charts';

type CandlestickChartPriceTextProps = {
  locale?: string;
  options?: { [key: string]: string };
  format?: TFormatterFn<number>;
  variant?: 'formatted' | 'value';
  style?: Animated.AnimateProps<RNTextProps>['style'];
};

export function CandlestickChartDatetimeText({
  locale,
  options,
  format,
  variant = 'formatted',
  ...props
}: CandlestickChartPriceTextProps) {
  const datetime = useCandlestickChartDatetime({ format, locale, options });
  return <ReText text={datetime[variant]} {...props} />;
}
