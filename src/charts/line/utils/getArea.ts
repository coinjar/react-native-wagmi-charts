import * as shape from 'd3-shape';
import { scaleLinear } from 'd3-scale';

import type { TLineChartData, TLineChartPoint, YDomain } from '../types';

export function getArea({
  data,
  width,
  height,
  gutter,
  shape: _shape,
  yDomain,
  xDomain,
}: {
  data: TLineChartData;
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

  const area = shape
    .area<TLineChartPoint>()
    .x((_: TLineChartPoint, i: number) =>
      scaleX(xDomain ? timestamps[i] ?? i : i)
    )
    .y0((d: TLineChartPoint) => scaleY(d.value))
    .y1(() => height)
    .curve(_shape as shape.CurveFactory)(data);

  return area || '';
}
