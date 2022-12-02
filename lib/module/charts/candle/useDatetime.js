import { useDerivedValue } from 'react-native-reanimated';
import { formatDatetime } from '../../utils';
import { useCandleData } from './useCandleData';
export function useCandlestickChartDatetime({
  format,
  locale,
  options
} = {}) {
  const candle = useCandleData();
  const timestamp = useDerivedValue(() => {
    return candle.value.timestamp;
  });
  const timestampString = useDerivedValue(() => {
    if (timestamp.value === -1) return '';
    return timestamp.value.toString();
  });
  const formatted = useDerivedValue(() => {
    if (timestamp.value === -1) return '';
    const formattedDatetime = formatDatetime({
      value: timestamp.value,
      locale,
      options
    });
    return format ? format({
      value: timestamp.value,
      formatted: formattedDatetime
    }) : formattedDatetime;
  });
  return {
    value: timestampString,
    formatted
  };
}
//# sourceMappingURL=useDatetime.js.map