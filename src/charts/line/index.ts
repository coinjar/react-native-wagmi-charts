import { LineChartGradient } from './Gradient';
import { LineChart as _LineChart } from './Chart';
import { LineChartPathWrapper } from './ChartPath';
import { LineChartProvider } from './Context';
import { LineChartCursor } from './Cursor';
import { LineChartCursorCrosshair } from './CursorCrosshair';
import { LineChartCursorLine } from './CursorLine';
import { LineChartHorizontalLine } from './HorizontalLine';
import { LineChartTooltip } from './Tooltip';
import { LineChartPriceText } from './PriceText';
import { LineChartDatetimeText } from './DatetimeText';
import { useLineChartDatetime } from './useDatetime';
import { useLineChartPrice } from './usePrice';
import { useLineChart } from './useLineChart';
import { LineChartGroup } from './Group';
import { LineChartDot } from './Dot';

export * from './Gradient';
export * from './Chart';
export * from './ChartPath';
export * from './Context';
export * from './Cursor';
export * from './CursorCrosshair';
export * from './CursorLine';
export * from './Tooltip';
export * from './DatetimeText';
export * from './Path';
export * from './PriceText';
export * from './useDatetime';
export * from './useLineChart';
export * from './usePrice';
export * from './types';

export const LineChart = Object.assign(_LineChart, {
  Gradient: LineChartGradient,
  Chart: _LineChart,
  Path: LineChartPathWrapper,
  Cursor: LineChartCursor,
  CursorCrosshair: LineChartCursorCrosshair,
  CursorLine: LineChartCursorLine,
  HorizontalLine: LineChartHorizontalLine,
  Tooltip: LineChartTooltip,
  Provider: LineChartProvider,
  PriceText: LineChartPriceText,
  DatetimeText: LineChartDatetimeText,
  useDatetime: useLineChartDatetime,
  usePrice: useLineChartPrice,
  useChart: useLineChart,
  Group: LineChartGroup,
  Dot: LineChartDot, 
});
