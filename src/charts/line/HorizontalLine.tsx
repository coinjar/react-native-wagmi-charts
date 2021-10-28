import React from 'react';
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { Line as SVGLine, LineProps } from 'react-native-svg';
import { getYForX, parse } from 'react-native-redash';

import { LineChartDimensionsContext } from './Chart';
import { useLineChart } from './useLineChart';

const AnimatedLine = Animated.createAnimatedComponent(SVGLine);

type HorizontalLineProps = {
  color?: string;
  lineProps?: Partial<LineProps>;
  at?: number;
};

export const LineChartHorizontalLine = ({
  color = 'gray',
  lineProps = {},
  at = 0,
}: HorizontalLineProps) => {
  const { width, path } = React.useContext(LineChartDimensionsContext);
  const { data } = useLineChart();

  const parsedPath = React.useMemo(() => parse(path), [path]);
  const pointWidth = React.useMemo(
    () => width / data.length,
    [data.length, width]
  );

  const y = useDerivedValue(() =>
    withTiming(getYForX(parsedPath!, pointWidth * at) || 0)
  );

  const lineAnimatedProps = useAnimatedProps(() => ({
    x1: 0,
    x2: width,
    y1: y.value,
    y2: y.value,
  }));

  return (
    <AnimatedLine
      animatedProps={lineAnimatedProps}
      strokeWidth={2}
      stroke={color}
      strokeDasharray="3 3"
      {...lineProps}
    />
  );
};
