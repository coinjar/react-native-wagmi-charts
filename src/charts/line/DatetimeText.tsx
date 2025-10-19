import React from 'react';
import type { TextProps as RNTextProps } from 'react-native';
import type { AnimatedProps } from 'react-native-reanimated';
import { useDerivedValue } from 'react-native-reanimated';
import { useLineChartDatetime } from './useDatetime';
import type { TFormatterFn } from '../../types';
import { AnimatedText } from '../../components/AnimatedText';

type LineChartDatetimeProps = {
  locale?: string;
  options?: Intl.DateTimeFormatOptions;
  format?: TFormatterFn<number>;
  variant?: 'formatted' | 'value';
  style?: AnimatedProps<RNTextProps>['style'];
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
    const value = datetime[variant].value;
    if (typeof value === 'number') {
      return value === 0 || isNaN(value) ? '' : value.toString();
    }
    return value || '';
  }, [datetime, variant]);

  return <AnimatedText text={text} style={style} />;
}
