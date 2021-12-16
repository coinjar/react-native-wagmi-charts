import { LineChart as _LineChart } from './Chart';
import { LineChartPathWrapper } from './ChartPath';
import { LineChartHighlight } from './Highlight';
import { LineChartProvider } from './Context';
import { LineChartCursor } from './Cursor';
import { LineChartCursorCrosshair } from './CursorCrosshair';
import { LineChartCursorLine } from './CursorLine';
import { LineChartDot } from './Dot';
import { LineChartGradient } from './Gradient';
import { LineChartGroup } from './Group';
import { LineChartHorizontalLine } from './HorizontalLine';
import { LineChartTooltip } from './Tooltip';
import { LineChartPriceText } from './PriceText';
import { LineChartDatetimeText } from './DatetimeText';
import { useLineChartDatetime } from './useDatetime';
import { useLineChartPrice } from './usePrice';
import { useLineChart } from './useLineChart';
import { LineChartHoverTrap } from '../line/HoverTrap';

export * from './Chart';
export * from './ChartPath';
export * from './Highlight';
export * from './Context';
export * from './Cursor';
export * from './CursorCrosshair';
export * from './CursorLine';
export * from './Dot';
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
  Chart: _LineChart,
  Dot: LineChartDot,
  Path: LineChartPathWrapper,
  Cursor: LineChartCursor,
  CursorCrosshair: LineChartCursorCrosshair,
  CursorLine: LineChartCursorLine,
  Gradient: LineChartGradient,
  Group: LineChartGroup,
  Highlight: LineChartHighlight,
  HorizontalLine: LineChartHorizontalLine,
  Tooltip: LineChartTooltip,
  Provider: LineChartProvider,
  PriceText: LineChartPriceText,
  DatetimeText: LineChartDatetimeText,
  useDatetime: useLineChartDatetime,
  usePrice: useLineChartPrice,
  useChart: useLineChart,
  HoverTrap: LineChartHoverTrap,
});
