import React from 'react';
import type { AtPoint } from './types';
import { useLineChart } from './useLineChart';
import { LineChartDimensionsContext } from './Chart';
import { getYForX, parse } from 'react-native-redash';
import { useDerivedValue, withTiming } from 'react-native-reanimated';

export type ViewAtProps = {
  at: AtPoint;
  offsetY?: number;
};

export function useYAt({ at, offsetY = 0 }: ViewAtProps) {
  const { width, path, height, gutter } = React.useContext(
    LineChartDimensionsContext
  );
  const { data, yDomain } = useLineChart();

  const parsedPath = React.useMemo(() => parse(path), [path]);
  const pointWidth = React.useMemo(
    () => width / data.length,
    [data.length, width]
  );

  return useDerivedValue(() => {
    if (typeof at === 'number' || at.index != null) {
      const index = typeof at === 'number' ? at : at.index;
      const yForX = getYForX(parsedPath!, pointWidth * index) || 0;
      return withTiming(yForX + offsetY);
    }
    /**
     * <gutter>
     * | ---------- | <- yDomain.max  |
     * |            |                 | offsetTop
     * |            | <- value        |
     * |            |
     * |            | <- yDomain.min
     * <gutter>
     */

    const offsetTop = yDomain.max - at.value;
    const percentageOffsetTop = offsetTop / (yDomain.max - yDomain.min);

    const heightBetweenGutters = height - gutter * 2;

    const offsetTopPixels = gutter + percentageOffsetTop * heightBetweenGutters;

    return withTiming(offsetTopPixels + offsetY);
  }, [at, parsedPath, pointWidth, yDomain, height, gutter, offsetY]);
}
