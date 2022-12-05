import * as React from 'react';
import type { TextProps as RNTextProps } from 'react-native';
import type Animated from 'react-native-reanimated';

import { useLineChartPrice } from './usePrice';
import type { TFormatterFn } from '../candle/types';
import { AnimatedText } from '../../components/AnimatedText';

export type LineChartTrusteePriceTextProps = {
  format?: TFormatterFn<string>;
  precision?: number;
  variant?: 'formatted' | 'value';
  style?: Animated.AnimateProps<RNTextProps>['style'];
  currencySymbol?: string;
};

LineChartTrusteePriceText.displayName = 'LineChartTrusteePriceText';

export function LineChartTrusteePriceText({
  format,
  precision = 2,
  variant = 'formatted',
  style,
  currencySymbol
}: LineChartTrusteePriceTextProps) {
  const price = useLineChartPrice({ format, precision,currencySymbol });
  return <AnimatedText text={price[variant]} style={style} />;
}
