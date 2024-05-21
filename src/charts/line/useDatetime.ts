import { useDerivedValue } from 'react-native-reanimated';

import { formatDatetime } from '../../utils';
import type { TFormatterFn } from '../candle/types';
import { useLineChart } from './useLineChart';

export function useLineChartDatetime({
  format,
  locale,
  options,
}: {
  format?: TFormatterFn<number>;
  locale?: string;
  options?: Intl.DateTimeFormatOptions;
} = {}) {
  const { currentIndex, data } = useLineChart();

  const timestamp = useDerivedValue(() => {
    if (
      !data ||
      typeof currentIndex.value === 'undefined' ||
      currentIndex.value === -1
    ) {
      return '';
    }
    return data[currentIndex.value]?.timestamp ?? '';
  }, [currentIndex, data]);

  const timestampString = useDerivedValue(() => {
    if (timestamp.value === '') return '';
    return timestamp.value.toString();
  }, [timestamp]);

  const formatted = useDerivedValue(() => {
    const formattedDatetime = timestamp.value
      ? formatDatetime({
          value: timestamp.value,
          locale,
          options,
        })
      : '';
    return format
      ? format({ value: timestamp.value || -1, formatted: formattedDatetime })
      : formattedDatetime;
  }, [format, locale, options, timestamp]);

  return { value: timestampString, formatted };
}
