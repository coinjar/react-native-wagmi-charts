import React from 'react';
import Animated, { useAnimatedProps } from 'react-native-reanimated';
import { Line as SVGLine, LineProps } from 'react-native-svg';
import { LineChartDimensionsContext } from './Chart';
import type { AtPoint } from './types';
import { useYAt } from './useYAt';

const AnimatedLine = Animated.createAnimatedComponent(SVGLine);

type HorizontalLineProps = {
  color?: string;
  lineProps?: Partial<LineProps>;
  offsetY?: number;
  /**
   * (Optional) A pixel value to nudge the line up or down.
   *
   * This may be useful to customize the line's position based on the thickness of your cursor or chart path.
   *
   * ```tsx
   * <LineChart.HorizontalLine
   *   at={{ index: 3 }}
   * />
   *
   * // or
   *
   * <LineChart.HorizontalLine
   *   at={{ value: 320.32}}
   * />
   * ```
   */
  at?: AtPoint;
};

LineChartHorizontalLine.displayName = 'LineChartHorizontalLine';

export function LineChartHorizontalLine({
  color = 'gray',
  lineProps = {},
  at = { index: 0 },
  offsetY = 0,
}: HorizontalLineProps) {
  const { width } = React.useContext(LineChartDimensionsContext);
  const y = useYAt({
    at,
    offsetY,
  });

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
}
