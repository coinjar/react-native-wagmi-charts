import * as React from 'react';
import { ReText } from 'react-native-redash';
import type { TextProps as RNTextProps } from 'react-native';
import type Animated from 'react-native-reanimated';
import type { TPriceType } from './types';

import { usePrice } from './usePrice';

type PriceTextProps = {
  format?: any;
  precision?: number;
  variant?: 'formatted' | 'value';
  type?: TPriceType;
  style?: Animated.AnimateProps<RNTextProps>['style'];
};

export function PriceText({
  format,
  precision = 2,
  variant = 'formatted',
  type = 'crosshair',
  ...props
}: PriceTextProps) {
  const price = usePrice({ format, precision, type });
  return <ReText text={price[variant]} {...props} />;
}
