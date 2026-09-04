import type { TLineChartPoint } from '../types';

export const getDomain = (rows: TLineChartPoint[]): [number, number] => {
  'worklet';
  if (rows.length === 0) return [0, 0];
  const values = rows.map(({ value }) => value);
  return [Math.min(...values), Math.max(...values)];
};
