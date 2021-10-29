import * as React from 'react';
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { Circle, CircleProps } from 'react-native-svg';
import { getYForX, parse } from 'react-native-redash';

import { LineChartDimensionsContext } from './Chart';
import { LineChartPathContext } from './ChartPath';
import { useLineChart } from './useLineChart';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export type LineChartDotProps = Animated.AnimateProps<CircleProps> & {
  color?: string;
  inactiveColor?: string;
  showInactiveColor?: boolean;
  at: number;
  size?: number;
};

LineChartDot.displayName = 'LineChartDot';

export function LineChartDot({
  color = 'black',
  inactiveColor,
  showInactiveColor = true,
  at,
  size = 4,
  ...props
}: LineChartDotProps) {
  const { data } = useLineChart();
  const { path, width } = React.useContext(LineChartDimensionsContext);
  const { isInactive: _isInactive } = React.useContext(LineChartPathContext);
  const isInactive = showInactiveColor && _isInactive;

  const parsedPath = React.useMemo(() => parse(path), [path]);
  const pointWidth = React.useMemo(
    () => width / (data.length - 1),
    [data.length, width]
  );

  const x = useDerivedValue(() => withTiming(pointWidth * at));
  const y = useDerivedValue(() =>
    withTiming(getYForX(parsedPath!, x.value) || 0)
  );

  const animatedProps = useAnimatedProps(() => ({
    cx: x.value,
    cy: y.value,
  }));

  return (
    <>
      <AnimatedCircle
        animatedProps={animatedProps}
        r={size}
        fill={isInactive ? inactiveColor || color : color}
        opacity={isInactive && !inactiveColor ? 0.5 : 1}
        {...props}
      />
    </>
  );
}
