import * as React from 'react';
import Animated, {
  useAnimatedProps,
  useAnimatedReaction,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Path, PathProps } from 'react-native-svg';

import { LineChartDimensionsContext } from './Chart';
import interpolatePath from './interpolatePath';
import { usePrevious } from '../../utils';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export type LineChartPathProps = Animated.AnimateProps<PathProps> & {
  color?: string;
  width?: number;
  isInactive?: boolean;
};

export function LineChartPath({
  color = 'black',
  width = 3,
  isInactive,
  ...props
}: LineChartPathProps) {
  const { path } = React.useContext(LineChartDimensionsContext);

  ////////////////////////////////////////////////

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
    if (previousPath) {
      const pathInterpolator = interpolatePath(previousPath, path, null);
      d = pathInterpolator(transition.value);
    }
    return {
      d,
    };
  });

  ////////////////////////////////////////////////

  return (
    <>
      <AnimatedPath
        animatedProps={animatedProps}
        fill="transparent"
        stroke={color}
        strokeOpacity={isInactive ? 0.2 : 1}
        strokeWidth={width}
        {...props}
      />
    </>
  );
}
