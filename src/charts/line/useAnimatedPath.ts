import React from 'react';
import {
  useAnimatedProps,
  useAnimatedReaction,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { interpolatePreparedPath, prepareInterpolatedPath } from './utils';
import { usePrevious } from '../../utils';

export function useAnimatedPath({
  enabled = true,
  path,
}: {
  enabled?: boolean;
  path: string;
}) {
  const transition = useSharedValue(0);
  const previousPath = usePrevious(path);

  useAnimatedReaction(
    () => {
      return path;
    },
    (result, previous) => {
      if (result !== previous) {
        transition.value = 0;
        transition.value = withTiming(1);
      }
    },
    [path]
  );

  // Lining the two paths up costs far more than sampling between them, and only
  // changes with the data — so it happens here once, not on the UI thread on
  // every frame of every transition.
  const interpolation = React.useMemo(
    () =>
      previousPath && enabled
        ? prepareInterpolatedPath(previousPath, path, null)
        : null,
    [enabled, path, previousPath]
  );

  const animatedProps = useAnimatedProps(() => {
    if (!interpolation) {
      return { d: path || '' };
    }
    return { d: interpolatePreparedPath(interpolation, transition.value) };
  });

  return { animatedProps };
}
