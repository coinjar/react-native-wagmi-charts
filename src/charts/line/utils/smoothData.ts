// @ts-ignore
import smoothish from 'smoothish';
import type { TLineChartData, TLineChartPoint } from '../types';

export const smoothData = (data: TLineChartData, radius: number) => {
  let values = data.map((item: TLineChartPoint) => item.value);
  const smoothed = smoothish(values, { radius: radius });
  data.forEach(function (item: TLineChartPoint, i: number) {
    item.smoothedValue = smoothed[i];
  });
  return data;
};
