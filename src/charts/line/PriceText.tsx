import * as React from 'react';
import type { TextProps as RNTextProps } from 'react-native';
import type Animated from 'react-native-reanimated';

import { useLineChartPrice } from './usePrice';
import type { TFormatterFn } from '../candle/types';
import { AnimatedText } from '../../components/AnimatedText';

export type LineChartPriceTextProps = {
  format?: TFormatterFn<string>;
  precision?: number;
  variant?: 'formatted' | 'value';
  style?: Animated.AnimateProps<RNTextProps>['style'];
};

LineChartPriceText.displayName = 'LineChartPriceText';

export function LineChartPriceText({
  format,
  precision = 2,
  variant = 'formatted',
  style,
}: LineChartPriceTextProps) {
  const price = useLineChartPrice({ format, precision });
  return <AnimatedText text={price[variant]} style={style} />;
}
