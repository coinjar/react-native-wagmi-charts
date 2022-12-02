import { interpolate, Extrapolate } from 'react-native-reanimated';
export function getPrice({
  y,
  domain,
  maxHeight
}) {
  'worklet';

  if (y === -1) return -1;
  return interpolate(y, [0, maxHeight], domain.reverse(), Extrapolate.CLAMP);
}
//# sourceMappingURL=getPrice.js.map