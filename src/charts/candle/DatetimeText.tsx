import * as React from 'react';
import type { TextProps as RNTextProps } from 'react-native';
import type Animated from 'react-native-reanimated';

import { useCandlestickChartDatetime } from './useDatetime';
import type { TFormatterFn } from 'react-native-wagmi-charts';
import { AnimatedText } from '../../components/AnimatedText';

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
  style,
}: CandlestickChartPriceTextProps) {
  const datetime = useCandlestickChartDatetime({ format, locale, options });
  return <AnimatedText text={datetime[variant]} style={style} />;
}
