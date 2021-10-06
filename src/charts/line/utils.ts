// @ts-ignore
import * as shape from 'd3-shape';
// @ts-ignore
import { scaleLinear } from 'd3-scale';

import type { TLineChartData, TLineChartPoint } from './types';
import type { Path } from 'react-native-redash';

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

export function syncChangingPaths({
  pointsToAdd,
  parsedPath,
  curves,
}: {
  pointsToAdd: number;
  parsedPath: Path;
  curves: Path['curves'];
}) {
  'worklet';
  const firstPoint = curves?.[0];

  let newParsedPath = parsedPath;
  for (let i = 0; i < Math.abs(pointsToAdd); i++) {
    newParsedPath = {
      ...newParsedPath,
      curves: [
        {
          c1: {
            x: firstPoint.c1.x,
            y: firstPoint.c1.y,
          },
          c2: {
            x: firstPoint.c2.x,
            y: firstPoint.c2.y,
          },
          to: {
            x: firstPoint.to.x,
            y: firstPoint.to.y,
          },
        },
        ...newParsedPath.curves,
      ],
    };
  }
  return newParsedPath;
}

export function syncPaths({
  parsedPath,
  previousParsedPath,
}: {
  parsedPath: Path;
  previousParsedPath: Path | undefined;
}) {
  'worklet';
  const previousCurves = (previousParsedPath as any)?.curves;
  const nextCurves = parsedPath?.curves;

  let newPreviousParsedPath = previousParsedPath || parsedPath;
  let newParsedPath = parsedPath;

  if (previousCurves?.length !== nextCurves?.length) {
    const pointsToAdd = nextCurves?.length - previousCurves?.length || 0;

    if (pointsToAdd > 0) {
      newPreviousParsedPath = syncChangingPaths({
        pointsToAdd,
        parsedPath: newPreviousParsedPath,
        curves: previousCurves,
      });
    } else if (pointsToAdd < 0) {
      newParsedPath = syncChangingPaths({
        pointsToAdd,
        parsedPath: newParsedPath,
        curves: nextCurves,
      });
    }
  }

  return {
    previousParsedPath: newPreviousParsedPath,
    parsedPath: newParsedPath,
  };
}
