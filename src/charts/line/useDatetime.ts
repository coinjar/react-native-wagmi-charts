import { useDerivedValue } from 'react-native-reanimated';

import { formatDatetime } from '../../utils';
import type { TFormatterFn } from '../candle/types';
import { useLineChart } from './useLineChart';

export function useLineChartDatetime({
  format,
  locale,
  options,
  trustee
}: {
  format?: TFormatterFn<number>;
  locale?: string;
  options?: Intl.DateTimeFormatOptions;
  trustee?: string;
} = {}) {
  const { currentIndex, data } = useLineChart();

  const timestamp = useDerivedValue(() => {
    if (typeof currentIndex.value === 'undefined' || currentIndex.value === -1)
      return '';
    return data[currentIndex.value].timestamp;
  });

  const timestampString = useDerivedValue(() => {
    if (timestamp.value === '') return '';
    return timestamp.value.toString();
  });

  const formatted = useDerivedValue(() => {
    const formattedDatetime = timestamp.value
      ? formatDatetime({
          value: timestamp.value,
          locale,
          options,
          trustee
        })
      : '';
    return format
      ? format({ value: timestamp.value || -1, formatted: formattedDatetime })
      : formattedDatetime;
  });

  return { value: timestampString, formatted };
}
