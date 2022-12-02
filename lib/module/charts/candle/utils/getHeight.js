import { interpolate, Extrapolate } from 'react-native-reanimated';
export function getHeight({
  value,
  domain,
  maxHeight
}) {
  'worklet';

  return interpolate(value, [0, Math.max(...domain) - Math.min(...domain)], [0, maxHeight], Extrapolate.CLAMP);
}
//# sourceMappingURL=getHeight.js.map