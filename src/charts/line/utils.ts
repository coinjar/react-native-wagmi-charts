// @ts-ignore
import * as shape from 'd3-shape';
// @ts-ignore
import { scaleLinear } from 'd3-scale';

import type { TLineChartData, TLineChartPoint, YDomain } from './types';
import type { TLineChartDataProp } from './types';

export function getDomain(rows: TLineChartPoint[]): [number, number] {
  'worklet';
  const values = rows.map(({ value }) => value);
  return [Math.min(...values), Math.max(...values)];
}

export function lineChartDataPropToArray(
  dataProp: TLineChartDataProp
): TLineChartData {
  'worklet';

  if (!dataProp) {
    return [];
  }

  if (Array.isArray(dataProp)) {
    return dataProp;
  }

  const data: TLineChartData = [];

  Object.values(dataProp).forEach((dataSet) => {
    if (dataSet) {
      data.push(...dataSet);
    }
  });

  return data;
}

export function getPath({
  data,
  width,
  height,
  gutter,
  shape: _shape = shape.curveBumpX,
  yDomain,
}: {
  data: TLineChartData;
  width: number;
  height: number;
  gutter: number;
  shape?: string;
  yDomain: YDomain;
}): string {
  const timestamps = data.map((_, i) => i);

  const scaleX = scaleLinear()
    .domain([Math.min(...timestamps), Math.max(...timestamps)])
    .range([0, width]);
  const scaleY = scaleLinear()
    .domain([yDomain.min, yDomain.max])
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
  yDomain,
}: {
  data: TLineChartData;
  width: number;
  height: number;
  gutter: number;
  shape?: string;
  yDomain: YDomain;
}): string {
  const timestamps = data.map((_, i) => i);

  const scaleX = scaleLinear()
    .domain([Math.min(...timestamps), Math.max(...timestamps)])
    .range([0, width]);
  const scaleY = scaleLinear()
    .domain([yDomain.min, yDomain.max])
    .range([height - gutter, gutter]);
  const area = shape
    .area()
    .x((_: unknown, i: number) => scaleX(i))
    .y0((d: { value: unknown }) => scaleY(d.value))
    .y1(() => height)
    .curve(_shape)(data);
  return area;
}
