import { interpolate, Extrapolate } from 'react-native-reanimated';

import type { TDomain } from '../types';

export function getHeight({
  value,
  domain,
  maxHeight,
}: {
  value: number;
  domain: TDomain;
  maxHeight: number;
}) {
  'worklet';
  return interpolate(
    value,
    [0, Math.max(...domain) - Math.min(...domain)],
    [0, maxHeight],
    Extrapolate.CLAMP
  );
}
