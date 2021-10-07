import { useDerivedValue } from 'react-native-reanimated';

import { formatPrice } from '../../utils';
import type { TFormatterFn } from '../candle/types';
import { useLineChart } from './useLineChart';

export function useLineChartPrice({
  format,
  precision = 2,
}: { format?: TFormatterFn<string>; precision?: number } = {}) {
  const { currentIndex, data } = useLineChart();

  const float = useDerivedValue(() => {
    if (typeof currentIndex.value === 'undefined' || currentIndex.value === -1)
      return '';
    let price = 0;
    price = data[currentIndex.value].value;
    return price.toFixed(precision).toString();
  });
  const formatted = useDerivedValue(() => {
    if (!float.value) return '';
    const formattedPrice = formatPrice({ value: float.value });
    return format
      ? format({ value: float.value, formatted: formattedPrice })
      : formattedPrice;
  });

  return { value: float, formatted };
}
