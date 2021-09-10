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
}: {
  data: TLineChartData;
  width: number;
  height: number;
}): string {
  const timestamps = data.map(({ timestamp }) => timestamp);
  const values = data.map(({ value }) => value);
  const scaleX = scaleLinear()
    .domain([Math.min(...timestamps), Math.max(...timestamps)])
    .range([0, width]);
  const scaleY = scaleLinear()
    .domain([Math.min(...values), Math.max(...values)])
    .range([height - 10, 0]);
  const path = shape
    .line()
    .x((data: any) => scaleX(data.timestamp))
    .y((data: any) => scaleY(data.value))
    .curve(shape.curveBumpX)(data);
  return path;
}
