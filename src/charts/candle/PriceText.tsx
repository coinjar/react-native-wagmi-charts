import * as React from 'react';
import type { TextProps as RNTextProps } from 'react-native';
import type Animated from 'react-native-reanimated';
import type { TFormatterFn, TPriceType } from './types';

import { useCandlestickChartPrice } from './usePrice';
import { AnimatedText } from '../../components/AnimatedText';

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
  style,
}: CandlestickChartPriceTextProps) {
  const price = useCandlestickChartPrice({ format, precision, type });
  return <AnimatedText text={price[variant]} style={style} />;
}
