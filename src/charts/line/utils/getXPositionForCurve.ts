import type { Path } from 'react-native-redash';

export function getXPositionForCurve(path: Path, index: number) {
  'worklet';
  if (index === 0) {
    return path.move.x;
  }

  const point = path.curves[index - 1];

  if (point === undefined) {
    throw new Error(
      `Index out of bounds: ${index}. ` +
        `Expected an integer in the range [0, ${path.curves.length}]`
    );
  }

  return point.to.x;
}
