import { interpolate, Extrapolate } from 'react-native-reanimated';

import type { TDomain } from '../types';

export function getPrice({
  y,
  domain,
  maxHeight,
}: {
  y: number;
  domain: TDomain;
  maxHeight: number;
}) {
  'worklet';
  if (y === -1) return -1;
  return interpolate(y, [0, maxHeight], domain.reverse(), Extrapolate.CLAMP);
}
