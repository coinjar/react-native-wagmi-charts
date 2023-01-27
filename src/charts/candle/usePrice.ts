import Animated, { useDerivedValue } from 'react-native-reanimated';

import { formatPrice } from '../../utils';
import { useCandlestickChart } from './useCandlestickChart';
import { getPrice } from './utils';
import type { TFormatterFn, TPriceType } from './types';
import { useCandleData } from './useCandleData';

export function useCandlestickChartPrice({
  format,
  precision = 2,
  type = 'crosshair',
}: {
  format?: TFormatterFn<string>;
  precision?: number;
  type?: TPriceType;
} = {}): {
  value: Readonly<Animated.SharedValue<string>>;
  formatted: Readonly<Animated.SharedValue<string>>;
} {
  const { currentY, domain, height } = useCandlestickChart();
  const candle = useCandleData();

  const float = useDerivedValue(() => {
    let price = 0;
    if (type === 'crosshair') {
      price = getPrice({
        y: currentY.value,
        domain: [Math.min(...domain), Math.max(...domain)],
        maxHeight: height,
      });
    } else {
      price = candle.value[type];
    }
    if (price === -1) return '';
    return price.toFixed(precision).toString();
  }, [currentY, domain, height, candle, type, precision]);
  const formatted = useDerivedValue(() => {
    if (!float.value) return '';
    const formattedPrice = formatPrice({ value: float.value });
    return format
      ? format({ value: float.value, formatted: formattedPrice })
      : formattedPrice;
  }, [float, format]);

  return { value: float, formatted };
}
