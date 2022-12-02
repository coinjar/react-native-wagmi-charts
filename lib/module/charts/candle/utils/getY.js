import { interpolate, Extrapolate } from 'react-native-reanimated';
export function getY({
  value,
  domain,
  maxHeight
}) {
  'worklet';

  return interpolate(value, domain, [maxHeight, 0], Extrapolate.CLAMP);
}
//# sourceMappingURL=getY.js.map