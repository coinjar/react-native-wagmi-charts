import { interpolate, Extrapolate } from 'react-native-reanimated';

import type { TDomain } from '../types';

export function getY({
  value,
  domain,
  maxHeight,
}: {
  value: number;
  domain: TDomain;
  maxHeight: number;
}) {
  'worklet';
  return interpolate(value, domain, [maxHeight, 0], Extrapolate.CLAMP);
}
