// @ts-ignore
import * as shape from 'd3-shape';
// @ts-ignore
import { scaleLinear } from 'd3-scale';

import type { TLineChartData, TLineChartPoint } from './types';
import type { YRange } from './types';

export function getDomain(rows: TLineChartPoint[]): [number, number] {
  'worklet';
  const values = rows.map(({ value }) => value);
  return [Math.min(...values), Math.max(...values)];
}

export function getPath({
  data,
  width,
  height,
  gutter,
  shape: _shape = shape.curveBumpX,
  yRange,
}: {
  data: TLineChartData;
  width: number;
  height: number;
  gutter: number;
  shape?: string;
  yRange?: YRange;
}): string {
  const timestamps: number[] = [];
  const values: number[] = [];

  data.forEach(({ value }, index) => {
    values.push(value);
    timestamps.push(index);
  });

  const yMin = yRange?.min ?? Math.min(...values);
  const yMax = yRange?.max ?? Math.max(...values);

  const scaleX = scaleLinear()
    .domain([Math.min(...timestamps), Math.max(...timestamps)])
    .range([0, width]);
  const scaleY = scaleLinear()
    .domain([yMin, yMax])
    .range([height - gutter, gutter]);
  const path = shape
    .line()
    .x((_: unknown, i: number) => scaleX(i))
    .y((d: { value: unknown }) => scaleY(d.value))
    .curve(_shape)(data);
  return path;
}

export function getArea({
  data,
  width,
  height,
  gutter,
  shape: _shape = shape.curveBumpX,

  yRange,
}: {
  data: TLineChartData;
  width: number;
  height: number;
  gutter: number;
  shape?: string;
  yRange?: YRange;
}): string {
  const timestamps: number[] = [];
  const values: number[] = [];

  data.forEach(({ value }, index) => {
    values.push(value);
    timestamps.push(index);
  });

  const yMin = yRange?.min ?? Math.min(...values);
  const yMax = yRange?.max ?? Math.max(...values);

  const scaleX = scaleLinear()
    .domain([Math.min(...timestamps), Math.max(...timestamps)])
    .range([0, width]);
  const scaleY = scaleLinear()
    .domain([yMin, yMax])
    .range([height - gutter, gutter]);
  const area = shape
    .area()
    .x((_: unknown, i: number) => scaleX(i))
    .y0((d: { value: unknown }) => scaleY(d.value))
    .y1(() => height)
    .curve(_shape)(data);
  return area;
}
