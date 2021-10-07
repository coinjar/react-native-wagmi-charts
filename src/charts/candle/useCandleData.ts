import Animated, { useDerivedValue } from 'react-native-reanimated';
import type { TCandle } from './types';

import { useCandlestickChart } from './useCandlestickChart';

export function useCandleData(): Readonly<Animated.SharedValue<TCandle>> {
  const { currentX, data, step } = useCandlestickChart();

  const candle = useDerivedValue(() => {
    if (currentX.value === -1) {
      return { timestamp: -1, low: -1, open: -1, high: -1, close: -1 };
    }
    return data[Math.floor(currentX.value / step)];
  });

  return candle;
}
