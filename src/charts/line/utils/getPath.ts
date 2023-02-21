// @ts-ignore
import * as shape from 'd3-shape';
// @ts-ignore
import { scaleLinear } from 'd3-scale';

import type { TLineChartData, YDomain } from '../types';

export function getPath({
  data,
  from,
  to,
  width,
  height,
  gutter,
  shape: _shape,
  yDomain,
  xDomain,
}: {
  data: TLineChartData;
  from?: number;
  to?: number;
  width: number;
  height: number;
  gutter: number;
  shape?: unknown;
  yDomain: YDomain;
  xDomain?: [number, number];
}): string {
  const timestamps = data.map(({ timestamp }, i) => (xDomain ? timestamp : i));

  const scaleX = scaleLinear()
    .domain(xDomain ?? [Math.min(...timestamps), Math.max(...timestamps)])
    .range([0, width]);
  const scaleY = scaleLinear()
    .domain([yDomain.min, yDomain.max])
    .range([height - gutter, gutter]);
  const path = shape
    .line()
    .defined((d: { timestamp: number }) =>
      from || to
        ? data
            .slice(from, to ? to + 1 : undefined)
            .find((item) => item.timestamp === d.timestamp)
        : true
    )
    .x((_: unknown, i: number) => scaleX(xDomain ? timestamps[i] : i))
    .y((d: { value: number }) => scaleY(d.value))
    .curve(_shape)(data);
  return path;
}
