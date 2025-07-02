import React from 'react';
import type { TextProps as RNTextProps } from 'react-native';
import type Animated from 'react-native-reanimated';
import { useDerivedValue } from 'react-native-reanimated';

import { useLineChartDatetime } from './useDatetime';
import type { TFormatterFn } from 'react-native-wagmi-charts';
import { AnimatedText } from '../../components/AnimatedText';

type LineChartDatetimeProps = {
  locale?: string;
  options?: Intl.DateTimeFormatOptions;
  format?: TFormatterFn<number>;
  variant?: 'formatted' | 'value';
  style?: Animated.AnimateProps<RNTextProps>['style'];
};

LineChartDatetimeText.displayName = 'LineChartDatetimeText';

export function LineChartDatetimeText({
  locale,
  options,
  format,
  variant = 'formatted',
  style,
}: LineChartDatetimeProps) {
  const datetime = useLineChartDatetime({ format, locale, options });
  
  const text = useDerivedValue(() => {
    const value = datetime[variant];
    if (typeof value === 'number') {
      return value.toString();
    }
    return typeof value === 'object' && 'value' in value ? value.value : String(value);
  }, [datetime, variant]);

  return <AnimatedText text={text} style={style} />;
}