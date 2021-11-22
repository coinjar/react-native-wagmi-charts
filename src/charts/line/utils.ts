import * as React from 'react';
import {
  ReactNode,
  ReactChild,
  Children,
  isValidElement,
  cloneElement,
} from 'react';
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

export function getArea({
  data,
  width,
  height,
  gutter,
  shape: _shape,
  yDomain,
}: {
  data: TLineChartData;
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
  const area = shape
    .area()
    .x((_: unknown, i: number) => scaleX(i))
    .y0((d: { value: unknown }) => scaleY(d.value))
    .y1(() => height)
    .curve(_shape)(data);
  return area;
}

export function flattenChildren(
  children: ReactNode,
  depth: number = 0,
  keys: (string | number)[] = []
): ReactChild[] {
  return Children.toArray(children).reduce(
    // eslint-disable-next-line
    (acc: ReactChild[], node: any, nodeIndex) => {
      if (node.type === React.Fragment) {
        acc.push.apply(
          acc,
          flattenChildren(
            node.props.children,
            depth + 1,
            keys.concat(node.key || nodeIndex)
          )
        );
      } else {
        if (isValidElement(node)) {
          acc.push(
            cloneElement(node, {
              key: keys.concat(String(node.key)).join('.'),
            })
          );
        } else if (typeof node === 'string' || typeof node === 'number') {
          acc.push(node);
        }
      }
      return acc;
    },
    []
  );
}
