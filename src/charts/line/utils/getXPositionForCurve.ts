import type { Path } from 'react-native-redash';

export function getXPositionForCurve(path: Path, index: number) {
  'worklet';
  if (index === 0) {
    return path.move.x;
  }
  return path.curves[index - 1].to.x;
}
