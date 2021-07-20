import { interpolate, Extrapolate } from 'react-native-reanimated';
import { round } from 'react-native-redash';

import type { Candle } from './Candle';

export const formatUSD = (value: number) => {
  'worklet';
  return `$ ${round(value, 2).toLocaleString('en-US', { currency: 'USD' })}`;
};

export const formatDatetime = (value: string) => {
  'worklet';
  const d = new Date(value);
  return d.toLocaleTimeString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const getDomain = (rows: Candle[]): [number, number] => {
  'worklet';
  const values = rows.map(({ high, low }) => [high, low]).flat();
  return [Math.min(...values), Math.max(...values)];
};

export const scaleY = ({
  value,
  domain,
  maxHeight,
}: {
  value: number;
  domain: number[];
  maxHeight: number;
}) => {
  'worklet';
  return interpolate(value, domain, [maxHeight, 0], Extrapolate.CLAMP);
};

export const scaleBody = ({
  value,
  domain,
  maxHeight,
}: {
  value: number;
  domain: number[];
  maxHeight: number;
}) => {
  'worklet';
  return interpolate(
    value,
    [0, Math.max(...domain) - Math.min(...domain)],
    [0, maxHeight],
    Extrapolate.CLAMP
  );
};

export const scaleYInvert = ({
  y,
  domain,
  maxHeight,
}: {
  y: number;
  domain: number[];
  maxHeight: number;
}) => {
  'worklet';
  return interpolate(y, [0, maxHeight], domain.reverse(), Extrapolate.CLAMP);
};
