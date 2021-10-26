// @ts-ignore
import * as shape from 'd3-shape';
// @ts-ignore
import { scaleLinear } from 'd3-scale';

import type { TLineChartData, TLineChartPoint } from './types';

export function getDomain(rows: TLineChartPoint[]): [number, number] {
  'worklet';
  const values = rows.map(({ value }) => value);
  return [Math.min(...values), Math.max(...values)];
}

export function getPath({
  data,
  from,
  to,
  width,
  height,
  gutter,
  shape: _shape = shape.curveBumpX,
}: {
  data: TLineChartData;
  from?: number;
  to?: number;
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
    .defined((d: { timestamp: number }) =>
      from || to
        ? data.slice(from, to).find((item) => item.timestamp === d.timestamp)
        : true
    )
    .x((_: unknown, i: number) => scaleX(i))
    .y((d: { value: number }) => scaleY(d.value))
    .curve(_shape)(data);
  return path;
}

export function getArea({
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
  const area = shape
    .area()
    .x((_: unknown, i: number) => scaleX(i))
    .y0((d: { value: unknown }) => scaleY(d.value))
    .y1(() => height)
    .curve(_shape)(data);
  return area;
}
