import { useDerivedValue } from 'react-native-reanimated';

import { formatDatetime } from '../../utils';
import type { TFormatterFn } from '../../types';
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

  const value = useDerivedValue(
    () => new Date(timestamp.value).getTime(),
    [timestamp]
  );

  const formatted = useDerivedValue(() => {
    const formattedDatetime = value.value
      ? formatDatetime({
          value: value.value,
          locale,
          options,
        })
      : '';
    return format
      ? format({
          value: value.value || -1,
          formatted: formattedDatetime,
        })
      : formattedDatetime;
  }, [format, locale, options, value]);

  return { value, formatted };
}
