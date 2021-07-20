import { useDerivedValue } from 'react-native-reanimated';

import { useCandlestickChart } from './useCandlestickChart';
import { formatPrice, scaleYInvert } from './utils';

export function useCurrentPrice({
  format,
  precision = 2,
}: { format?: any; precision?: number } = {}) {
  const { currentY, domain, height } = useCandlestickChart();

  const float = useDerivedValue(() => {
    const price = scaleYInvert({
      y: currentY.value,
      domain: [Math.min(...domain), Math.max(...domain)],
      maxHeight: height,
    });
    return price.toFixed(precision).toString();
  });
  const formatted = useDerivedValue(() => {
    const formattedPrice = formatPrice({ value: float.value });
    return format
      ? format({ float: float.value, formatted: formattedPrice })
      : formattedPrice;
  });

  return { float, formatted };
}
