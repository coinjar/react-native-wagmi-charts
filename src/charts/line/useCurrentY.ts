import { useContext, useMemo } from 'react';
import { useDerivedValue } from 'react-native-reanimated';
import { getYForX, parse } from 'react-native-redash';
import { LineChartContext } from './Context';
import { LineChartDimensionsContext } from './Chart';

export function useCurrentY() {
  const { path, width } = useContext(LineChartDimensionsContext);
  const { currentX } = useContext(LineChartContext);
  const parsedPath = useMemo(() => (path ? parse(path) : undefined), [path]);

  const currentY = useDerivedValue(() => {
    if (!parsedPath) {
      return -1;
    }
    const boundedX = Math.min(width, currentX.value);
    return getYForX(parsedPath, boundedX) || 0;
  });

  return currentY;
}
