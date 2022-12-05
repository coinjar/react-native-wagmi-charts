import { useDerivedValue } from 'react-native-reanimated';

import { formatPrice } from '../../utils';
import type { TFormatterFn } from '../candle/types';
import { useLineChart } from './useLineChart';

export function useLineChartPrice({
  format,
  precision = 2,
  currencySymbol
}: { format?: TFormatterFn<string>; precision?: number, currencySymbol?: string } = {}) {
  const { currentIndex, data } = useLineChart();

  const float = useDerivedValue(() => {
    if (typeof currentIndex.value === 'undefined' || currentIndex.value === -1)
      return '';
    let price = 0;
    price = data[currentIndex.value].value;
    return price.toString();
  });
  const formatted = useDerivedValue(() => {
    let value = float.value || '';
    const formattedPrice = value ? formatPrice({ value }) : '';
    return format
      ? format({ value, formatted: formattedPrice, precision, currencySymbol })
      : formattedPrice;
  });

  return { value: float, formatted };
}
