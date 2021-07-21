import { useDerivedValue } from 'react-native-reanimated';
import { useCandleData } from './useCandleData';

import { formatDatetime } from './utils';

export function useDatetime({
  format,
  locale,
  options,
}: {
  format?: any;
  locale?: string;
  options?: { [key: string]: string };
} = {}) {
  const candle = useCandleData();

  const timestamp = useDerivedValue(() => {
    return candle.value.date;
  });

  const formatted = useDerivedValue(() => {
    if (!timestamp.value) return '';
    const formattedDatetime = formatDatetime({
      value: timestamp.value,
      locale,
      options,
    });
    return format
      ? format({ value: timestamp.value, formatted: formattedDatetime })
      : formattedDatetime;
  });

  return { value: timestamp, formatted };
}
