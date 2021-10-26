import * as React from 'react';
import Animated from 'react-native-reanimated';
import { Path, PathProps } from 'react-native-svg';

import { LineChartDimensionsContext } from './Chart';
import useAnimatedPath from './useAnimatedPath';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export type LineChartPathProps = Animated.AnimateProps<PathProps> & {
  color?: string;
  width?: number;
  isInactive?: boolean;
  /**
   * Default: `true`.
   *
   * If `false`, changes in the chart's path will not animate.
   *
   * While this use case is rare, it may be useful on web, where animations might not work as well.
   *
   * **Example**
   *
   * ```tsx
   * <LineChart.Path
   *   pathProps={{ isTransitionEnabled: Platform.OS !== 'web' }}
   * />
   * ```
   */
  isTransitionEnabled?: boolean;
};

export function LineChartPath({
  color = 'black',
  width: strokeWidth = 3,
  isInactive,
  isTransitionEnabled = true,
  ...props
}: LineChartPathProps) {
  const { path } = React.useContext(LineChartDimensionsContext);

  ////////////////////////////////////////////////

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
        strokeOpacity={isInactive ? 0.2 : 1}
        strokeWidth={strokeWidth}
        {...props}
      />
    </>
  );
}
