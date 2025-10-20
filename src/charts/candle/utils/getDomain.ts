import type { TCandle } from '../types';

export function getDomain(rows: TCandle[]): [min: number, max: number] {
  'worklet';
  if (rows.length === 0) return [0, 0];
  const values = rows.map(({ high, low }) => [high, low]).flat();
  const min = Math.min(...values);
  const max = Math.max(...values);
  return [min - (max - min) * 0.025, max + (max - min) * 0.025];
}
