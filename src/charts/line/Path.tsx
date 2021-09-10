import * as React from 'react';
import Animated, {
  useAnimatedProps,
  useAnimatedReaction,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Path } from 'react-native-svg';
import { mixPath, parse } from 'react-native-redash';

import { useLineChart } from './useLineChart';
import { usePrevious } from '../../utils';

const AnimatedPath = Animated.createAnimatedComponent(Path);

type LineChartPathProps = {
  color?: string;
  width?: number;
  height?: number;
};

export function LineChartPath({ color = 'black' }: LineChartPathProps) {
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
        strokeWidth={3}
      />
    </>
  );
}
