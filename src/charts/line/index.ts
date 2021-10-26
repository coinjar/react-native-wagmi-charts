import { LineChart as _LineChart } from './Chart';
import { LineChartPathWrapper } from './ChartPath';
import { LineChartColor } from './Color';
import { LineChartProvider } from './Context';
import { LineChartCursor } from './Cursor';
import { LineChartCursorCrosshair } from './CursorCrosshair';
import { LineChartCursorLine } from './CursorLine';
import { LineChartGradient } from './Gradient';
import { LineChartTooltip } from './Tooltip';
import { LineChartPriceText } from './PriceText';
import { LineChartDatetimeText } from './DatetimeText';
import { useLineChartDatetime } from './useDatetime';
import { useLineChartPrice } from './usePrice';
import { useLineChart } from './useLineChart';

export * from './Chart';
export * from './ChartPath';
export * from './Color';
export * from './Context';
export * from './Cursor';
export * from './CursorCrosshair';
export * from './CursorLine';
export * from './Gradient';
export * from './Tooltip';
export * from './DatetimeText';
export * from './Path';
export * from './PriceText';
export * from './useDatetime';
export * from './useLineChart';
export * from './usePrice';
export * from './types';

export const LineChart = Object.assign(_LineChart, {
  Color: LineChartColor,
  Gradient: LineChartGradient,
  Chart: _LineChart,
  Path: LineChartPathWrapper,
  Cursor: LineChartCursor,
  CursorCrosshair: LineChartCursorCrosshair,
  CursorLine: LineChartCursorLine,
  Tooltip: LineChartTooltip,
  Provider: LineChartProvider,
  PriceText: LineChartPriceText,
  DatetimeText: LineChartDatetimeText,
  useDatetime: useLineChartDatetime,
  usePrice: useLineChartPrice,
  useChart: useLineChart,
});
