import type { TLineChartPoint } from '../types';

export function getDomain(rows: TLineChartPoint[]): [number, number] {
  'worklet';
  const values = rows.map(({ value }) => value);
  return [Math.min(...values), Math.max(...values)];
}
