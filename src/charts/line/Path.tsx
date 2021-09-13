import * as React from 'react';
import Animated, {
  useAnimatedProps,
  useAnimatedReaction,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Path, PathProps } from 'react-native-svg';
import { mixPath, parse } from 'react-native-redash';

import { useLineChart } from './useLineChart';
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
  const { path } = useLineChart();

  ////////////////////////////////////////////////

  const transition = useSharedValue(0);

  const parsedPath = React.useMemo(() => parse(path), [path]);
  const previousParsedPath = usePrevious(parsedPath);

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
    return {
      d: mixPath(
        transition.value,
        previousParsedPath || parsedPath,
        parsedPath
      ),
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
