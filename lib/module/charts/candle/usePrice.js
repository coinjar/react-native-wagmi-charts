import { useDerivedValue } from 'react-native-reanimated';
import { formatPrice } from '../../utils';
import { useCandlestickChart } from './useCandlestickChart';
import { getPrice } from './utils';
import { useCandleData } from './useCandleData';
export function useCandlestickChartPrice({
  format,
  precision = 2,
  type = 'crosshair'
} = {}) {
  const {
    currentY,
    domain,
    height
  } = useCandlestickChart();
  const candle = useCandleData();
  const float = useDerivedValue(() => {
    let price = 0;

    if (type === 'crosshair') {
      price = getPrice({
        y: currentY.value,
        domain: [Math.min(...domain), Math.max(...domain)],
        maxHeight: height
      });
    } else {
      price = candle.value[type];
    }

    if (price === -1) return '';
    return price.toFixed(precision).toString();
  });
  const formatted = useDerivedValue(() => {
    if (!float.value) return '';
    const formattedPrice = formatPrice({
      value: float.value
    });
    return format ? format({
      value: float.value,
      formatted: formattedPrice
    }) : formattedPrice;
  });
  return {
    value: float,
    formatted
  };
}
//# sourceMappingURL=usePrice.js.map