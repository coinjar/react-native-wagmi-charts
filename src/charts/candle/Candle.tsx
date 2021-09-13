import React from 'react';
import Animated, {
  withTiming,
  useAnimatedProps,
} from 'react-native-reanimated';
import {
  Color,
  Line,
  LineProps,
  NumberProp,
  Rect,
  RectProps,
} from 'react-native-svg';

import type { TCandle, TDomain } from './types';
import { getY, getHeight } from './utils';

const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedLine = Animated.createAnimatedComponent(Line);

export type CandlestickChartCandleProps = {
  candle: TCandle;
  domain: TDomain;
  maxHeight: number;
  margin?: number;
  positiveColor?: string;
  negativeColor?: string;
  index: number;
  width: number;
  rectProps?: RectProps;
  lineProps?: LineProps;
  useAnimations?: boolean;
  renderRect?: ({
    x,
    y,
    width,
    height,
    fill,
  }: {
    x: NumberProp;
    y: NumberProp;
    width: NumberProp;
    height: NumberProp;
    fill: Color;
    useAnimations: boolean;
  }) => React.ReactNode;
  renderLine?: ({
    x1,
    y1,
    x2,
    y2,
    stroke,
    strokeWidth,
  }: {
    x1: NumberProp;
    y1: NumberProp;
    x2: NumberProp;
    y2: NumberProp;
    stroke: Color;
    strokeWidth: NumberProp;
    useAnimations: boolean;
  }) => React.ReactNode;
};

export const CandlestickChartCandle = ({
  candle,
  maxHeight,
  domain,
  margin = 2,
  positiveColor = '#10b981',
  negativeColor = '#ef4444',
  rectProps: overrideRectProps,
  lineProps: overrideLineProps,
  index,
  width,
  useAnimations = true,
  renderLine = (props) =>
    props.useAnimations ? <AnimatedLine {...props} /> : <Line {...props} />,
  renderRect = (props) =>
    props.useAnimations ? <AnimatedRect {...props} /> : <Rect {...props} />,
}: CandlestickChartCandleProps) => {
  const { close, open, high, low } = candle;
  const isPositive = close > open;
  const fill = isPositive ? positiveColor : negativeColor;
  const x = index * width;
  const max = Math.max(open, close);
  const min = Math.min(open, close);

  const lineProps = React.useMemo(
    () => ({
      stroke: fill,
      strokeWidth: 1,
      direction: isPositive ? 'positive' : 'negative',
      x1: x + width / 2,
      y1: getY({ maxHeight, value: low, domain }),
      x2: x + width / 2,
      y2: getY({ maxHeight, value: high, domain }),
      ...overrideLineProps,
    }),
    [
      domain,
      fill,
      high,
      isPositive,
      low,
      maxHeight,
      overrideLineProps,
      width,
      x,
    ]
  );
  const animatedLineProps = useAnimatedProps(() => ({
    x1: withTiming(x + width / 2),
    y1: withTiming(getY({ maxHeight, value: low, domain })),
    x2: withTiming(x + width / 2),
    y2: withTiming(getY({ maxHeight, value: high, domain })),
  }));

  const rectProps = React.useMemo(
    () => ({
      width: width - margin * 2,
      fill: fill,
      direction: isPositive ? 'positive' : 'negative',
      x: x + margin,
      y: getY({ maxHeight, value: max, domain }),
      height: getHeight({ maxHeight, value: max - min, domain }),
      ...overrideRectProps,
    }),
    [
      domain,
      fill,
      isPositive,
      margin,
      max,
      maxHeight,
      min,
      overrideRectProps,
      width,
      x,
    ]
  );
  const animatedRectProps = useAnimatedProps(() => ({
    x: withTiming(x + margin),
    y: withTiming(getY({ maxHeight, value: max, domain })),
    height: withTiming(getHeight({ maxHeight, value: max - min, domain })),
  }));

  return (
    <>
      {renderLine({
        ...lineProps,
        useAnimations,
        ...(useAnimations ? { animatedProps: animatedLineProps } : {}),
      })}
      {renderRect({
        ...rectProps,
        useAnimations,
        ...(useAnimations ? { animatedProps: animatedRectProps } : {}),
      })}
    </>
  );
};
