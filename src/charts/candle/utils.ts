import { interpolate, Extrapolate } from 'react-native-reanimated';

import type { TCandle, TDomain } from './types';

export function getDomain(rows: TCandle[]): [number, number] {
  'worklet';
  const values = rows.map(({ high, low }) => [high, low]).flat();
  return [Math.min(...values), Math.max(...values)];
}

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
