import * as React from 'react';
import Animated from 'react-native-reanimated';
import { Path, PathProps } from 'react-native-svg';

import { LineChartDimensionsContext } from './Chart';
import { LineChartPathContext } from './ChartPath';
import useAnimatedPath from './useAnimatedPath';
import { useLineChart } from './useLineChart';
import { getPath } from './utils';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export type LineChartColorProps = Animated.AnimateProps<PathProps> & {
  color?: string;
  width?: number;
};

export function LineChartColor({
  color = 'black',
  from,
  to,
  width: strokeWidth = 3,
  ...props
}: LineChartColorProps) {
  const { data } = useLineChart();
  const { width, height, gutter, shape } = React.useContext(
    LineChartDimensionsContext
  );
  const { isTransitionEnabled } = React.useContext(LineChartPathContext);

  ////////////////////////////////////////////////

  const path = React.useMemo(() => {
    if (data && data.length > 0) {
      return getPath({
        data,
        from,
        to,
        width,
        height,
        gutter,
        shape,
      });
    }
    return '';
  }, [data, from, to, width, height, gutter, shape]);

  const { animatedProps } = useAnimatedPath({
    enabled: isTransitionEnabled,
    path,
  });

  ////////////////////////////////////////////////

  return (
    <>
      <AnimatedPath
        animatedProps={animatedProps}
        fill="transparent"
        stroke={color}
        strokeWidth={strokeWidth}
        {...props}
      />
    </>
  );
}
