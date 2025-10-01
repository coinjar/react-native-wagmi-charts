import { useDerivedValue } from 'react-native-reanimated';

import { formatPrice } from '../../utils';
import type { TFormatterFn } from '../../types';
import { useLineChart } from './useLineChart';

export function useLineChartPrice({
  format,
  precision = 2,
  index,
}: { format?: TFormatterFn<string>; precision?: number; index?: number } = {}) {
  const { currentIndex, data } = useLineChart();

  const float = useDerivedValue(() => {
    if (!data) {
      return '';
    }

    if (
      (typeof currentIndex.value === 'undefined' ||
        currentIndex.value === -1) &&
      index == null
    ) {
      return '';
    }

    const dataPoint =
      data[Math.min(index ?? currentIndex.value, data.length - 1)];
    const price = dataPoint?.value ?? 0;
    return price.toFixed(precision).toString();
  }, [currentIndex, data, precision]);

  const formatted = useDerivedValue(() => {
    const value = float.value || '';
    const formattedPrice = value ? formatPrice({ value }) : '';
    return format
      ? format({ value, formatted: formattedPrice })
      : formattedPrice;
  }, [float, format]);

  return { value: float, formatted };
}
