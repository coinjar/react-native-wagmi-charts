import React from 'react';
import type { TextProps as RNTextProps } from 'react-native';
import type { AnimatedProps } from 'react-native-reanimated';

import { useCandlestickChartDatetime } from './useDatetime';
import type { TFormatterFn } from '../../types';
import { AnimatedText } from '../../components/AnimatedText';

type CandlestickChartPriceTextProps = {
  locale?: string;
  options?: { [key: string]: string };
  format?: TFormatterFn<number>;
  variant?: 'formatted' | 'value';
  style?: AnimatedProps<RNTextProps>['style'];
};

export function CandlestickChartDatetimeText({
  locale,
  options,
  format,
  variant = 'formatted',
  style,
}: CandlestickChartPriceTextProps) {
  const datetime = useCandlestickChartDatetime({ format, locale, options });
  return <AnimatedText text={datetime[variant]} style={style} />;
}
