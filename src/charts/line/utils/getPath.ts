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
}: {
  data: TLineChartData;
  from?: number;
  to?: number;
  width: number;
  height: number;
  gutter: number;
  shape?: unknown;
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
    .defined((d: { timestamp: number }) =>
      from || to
        ? data
            .slice(from, to ? to + 1 : undefined)
            .find((item) => item.timestamp === d.timestamp)
        : true
    )
    .x((_: unknown, i: number) => scaleX(i))
    .y((d: { value: number }) => scaleY(d.value))
    .curve(_shape)(data);
  return path;
}
