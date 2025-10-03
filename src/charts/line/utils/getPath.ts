import * as shape from 'd3-shape';
import { scaleLinear } from 'd3-scale';

import type { TLineChartData, TLineChartPoint, YDomain } from '../types';

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
    .line<TLineChartPoint>()
    .defined((d: TLineChartPoint) =>
      from || to
        ? !!data
            .slice(from, to ? to + 1 : undefined)
            .find((item) => item.timestamp === d.timestamp)
        : true
    )
    .x((_: TLineChartPoint, i: number) =>
      scaleX(xDomain ? timestamps[i] ?? i : i)
    )
    .y((d: TLineChartPoint) => scaleY(d.value))
    .curve(_shape as shape.CurveFactory)(data);

  return path || '';
}
