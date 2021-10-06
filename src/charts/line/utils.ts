// @ts-ignore
import * as shape from 'd3-shape';
// @ts-ignore
import { scaleLinear } from 'd3-scale';

import type { TLineChartData, TLineChartPoint } from './types';

export function getDomain(rows: TLineChartPoint[]): [number, number] {
  'worklet';
  const values = rows.map(({ value }) => [value]).flat();
  return [Math.min(...values), Math.max(...values)];
}

export function getPath({
  data,
  width,
  height,
  gutter,
  shape: _shape = shape.curveBumpX,
}: {
  data: TLineChartData;
  width: number;
  height: number;
  gutter: number;
  shape?: string;
}): string {
  const timestamps = data.map(({}, i) => i);
  const values = data.map(({ value }) => value);
  const scaleX = scaleLinear()
    .domain([Math.min(...timestamps), Math.max(...timestamps)])
    .range([0, width]);
  const scaleY = scaleLinear()
    .domain([Math.min(...values), Math.max(...values)])
    .range([height - gutter, gutter]);
  const path = shape
    .line()
    .x((_: any, i: number) => scaleX(i))
    .y((data: any) => scaleY(data.value))
    .curve(_shape)(data);
  return path;
}
