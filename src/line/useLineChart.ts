import * as React from 'react';

import { LineChartContext } from './Context';

export function useLineChart() {
  return React.useContext(LineChartContext);
}
