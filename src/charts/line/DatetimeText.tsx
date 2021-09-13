import * as React from 'react';
import { ReText } from 'react-native-redash';
import type { TextProps as RNTextProps } from 'react-native';
import type Animated from 'react-native-reanimated';

import { useLineChartDatetime } from './useDatetime';

type LineChartPriceTextProps = {
  locale?: string;
  options?: { [key: string]: any };
  format?: any;
  variant?: 'formatted' | 'value';
  style?: Animated.AnimateProps<RNTextProps>['style'];
};

export function LineChartDatetimeText({
  locale,
  options,
  format,
  variant = 'formatted',
  ...props
}: LineChartPriceTextProps) {
  const datetime = useLineChartDatetime({ format, locale, options });
  return <ReText text={datetime[variant]} {...props} />;
}
