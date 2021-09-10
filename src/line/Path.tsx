import * as React from 'react';
import { Path } from 'react-native-svg';

import { useLineChart } from './useLineChart';

type LineChartPathProps = {
  color?: string;
  width?: number;
  height?: number;
};

export function LineChartPath({ color = 'black' }: LineChartPathProps) {
  const { path } = useLineChart();

  ////////////////////////////////////////////////

  return (
    <>
      <Path d={path} fill="transparent" stroke={color} strokeWidth={3} />
    </>
  );
}
