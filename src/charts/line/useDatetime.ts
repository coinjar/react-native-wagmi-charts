import { useDerivedValue } from 'react-native-reanimated';

import { formatDatetime } from '../../utils';
import { useLineChart } from './useLineChart';

export function useLineChartDatetime({
  format,
  locale,
  options,
}: {
  format?: any;
  locale?: string;
  options?: { [key: string]: string };
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
    if (timestamp.value === '') return '';
    const formattedDatetime = formatDatetime({
      value: timestamp.value,
      locale,
      options,
    });
    return format
      ? format({ value: timestamp.value, formatted: formattedDatetime })
      : formattedDatetime;
  });

  return { value: timestampString, formatted };
}
