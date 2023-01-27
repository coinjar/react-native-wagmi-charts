import Animated, { useDerivedValue } from 'react-native-reanimated';

import { formatDatetime } from '../../utils';
import type { TFormatterFn } from './types';
import { useCandleData } from './useCandleData';

export function useCandlestickChartDatetime({
  format,
  locale,
  options,
}: {
  format?: TFormatterFn<number>;
  locale?: string;
  options?: { [key: string]: string };
} = {}): {
  value: Readonly<Animated.SharedValue<string>>;
  formatted: Readonly<Animated.SharedValue<string>>;
} {
  const candle = useCandleData();

  const timestamp = useDerivedValue(() => {
    return candle.value.timestamp;
  });

  const timestampString = useDerivedValue(() => {
    if (timestamp.value === -1) return '';
    return timestamp.value.toString();
  }, [timestamp]);

  const formatted = useDerivedValue(() => {
    if (timestamp.value === -1) return '';
    const formattedDatetime = formatDatetime({
      value: timestamp.value,
      locale,
      options,
    });
    return format
      ? format({ value: timestamp.value, formatted: formattedDatetime })
      : formattedDatetime;
  }, [timestamp, locale, options, format]);

  return { value: timestampString, formatted };
}
