import type { TLineChartData, TLineChartDataProp } from '../types';

export function lineChartDataPropToArray(
  dataProp: TLineChartDataProp
): TLineChartData {
  'worklet';

  if (!dataProp) {
    return [];
  }

  if (Array.isArray(dataProp)) {
    return dataProp;
  }

  const data: TLineChartData = [];

  Object.values(dataProp).forEach((dataSet) => {
    if (dataSet) {
      data.push(...dataSet);
    }
  });

  return data;
}
