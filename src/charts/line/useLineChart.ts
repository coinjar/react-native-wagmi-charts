import * as React from 'react';

import { LineChartContext } from './Context';
import { useLineChartData, useLineChartId } from './Data';
import { useCurrentY } from './useCurrentY';

export function useLineChart() {
  const lineChartContext = React.useContext(LineChartContext);
  const maybeId = useLineChartId();
  const dataContext = useLineChartData({
    id: maybeId,
  });
  const currentY = useCurrentY();

  return React.useMemo(
    () => ({ ...lineChartContext, ...dataContext, currentY }),
    [lineChartContext, dataContext, currentY]
  );
}
