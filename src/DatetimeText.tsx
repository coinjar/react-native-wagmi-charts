import * as React from 'react';
import { ReText } from 'react-native-redash';
import type { TextProps as RNTextProps } from 'react-native';
import type Animated from 'react-native-reanimated';

import { useDatetime } from './useDatetime';

type PriceTextProps = {
  locale?: string;
  options?: { [key: string]: string };
  format?: any;
  variant?: 'formatted' | 'value';
  style?: Animated.AnimateProps<RNTextProps>['style'];
};

export function DatetimeText({
  locale,
  options,
  format,
  variant = 'formatted',
  ...props
}: PriceTextProps) {
  const datetime = useDatetime({ format, locale, options });
  return <ReText text={datetime[variant]} {...props} />;
}
