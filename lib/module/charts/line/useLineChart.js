import * as React from 'react';
import { LineChartContext } from './Context';
import { useLineChartData, useLineChartId } from './Data';
import { useCurrentY } from './useCurrentY';
export function useLineChart() {
  const lineChartContext = React.useContext(LineChartContext);
  const maybeId = useLineChartId();
  const dataContext = useLineChartData({
    id: maybeId
  });
  const currentY = useCurrentY();
  let tmpContext = {
    data: []
  };

  for (const item of dataContext === null || dataContext === void 0 ? void 0 : dataContext.data) {
    tmpContext.data.push({ ...item
    });
  }

  return React.useMemo(() => ({ ...lineChartContext,
    ...tmpContext,
    currentY
  }), [lineChartContext, dataContext, currentY]);
}
//# sourceMappingURL=useLineChart.js.map