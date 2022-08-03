import * as React from 'react';
import { Path, PathProps } from 'react-native-svg';

import { LineChartDimensionsContext } from './Chart';
import { LineChartPathContext } from './ChartPath';

export type LineChartPathProps = PathProps & {
  color?: string;
  inactiveColor?: string;
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

LineChartPath.displayName = 'LineChartPath';

export function LineChartPath({
  color = 'black',
  width: strokeWidth = 3,
}: LineChartPathProps) {
  const { path } = React.useContext(LineChartDimensionsContext);
  const { isInactive } = React.useContext(LineChartPathContext);

  ////////////////////////////////////////////////

  const pathProps = {
    fill: 'transparent',
    stroke: color,
    strokeWidth,
    strokeOpacity: isInactive ? 0.2 : 1,
  };

  ////////////////////////////////////////////////

  return <Path d={path || ''} {...pathProps} />;
}
