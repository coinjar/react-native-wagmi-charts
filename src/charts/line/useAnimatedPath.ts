import {
  useAnimatedProps,
  useAnimatedReaction,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { usePrevious } from '../../utils';
import { interpolatePath } from './utils';

export default function useAnimatedPath({
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
    (_, previous) => {
      if (previous) {
        transition.value = 0;
        transition.value = withTiming(1);
      }
    },
    [path]
  );

  const animatedProps = useAnimatedProps(() => {
    let d = path || '';
    if (previousPath && enabled) {
      const pathInterpolator = interpolatePath(previousPath, path, null);
      d = pathInterpolator(transition.value);
    }
    return {
      d,
    };
  });

  return { animatedProps };
}
