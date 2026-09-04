import { interpolate, Extrapolation } from 'react-native-reanimated';

import type { TDomain } from '../types';

export const getY = ({
  value,
  domain,
  maxHeight,
}: {
  value: number;
  domain: TDomain;
  maxHeight: number;
}) => {
  'worklet';
  return interpolate(value, domain, [maxHeight, 0], Extrapolation.CLAMP);
};
