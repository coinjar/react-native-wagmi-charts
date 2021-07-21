import React from 'react';
import { Line, Rect } from 'react-native-svg';

import type { TCandle, TDomain } from './types';
import { getY, getHeight } from './utils';

const MARGIN = 2;

export type CandleProps = {
  candle: TCandle;
  domain: TDomain;
  maxHeight: number;
  positiveColor?: string;
  negativeColor?: string;
  index: number;
  width: number;
  renderRect?: ({
    x,
    y,
    width,
    height,
    fill,
  }: {
    x: number;
    y: number;
    width: number;
    height: number;
    fill: string;
  }) => React.ReactNode;
  renderLine?: ({
    x1,
    y1,
    x2,
    y2,
    stroke,
    strokeWidth,
  }: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    stroke: string;
    strokeWidth: number;
  }) => React.ReactNode;
};

const Candle = ({
  candle,
  maxHeight,
  domain,
  positiveColor = '#10b981',
  negativeColor = '#ef4444',
  index,
  width,
  renderLine = (props) => <Line {...props} />,
  renderRect = (props) => <Rect {...props} />,
}: CandleProps) => {
  const { close, open, high, low } = candle;
  const isPositive = close > open;
  const fill = isPositive ? positiveColor : negativeColor;
  const x = index * width;
  const max = Math.max(open, close);
  const min = Math.min(open, close);

  const lineProps = React.useMemo(
    () => ({
      x1: x + width / 2,
      y1: getY({ maxHeight, value: low, domain }),
      x2: x + width / 2,
      y2: getY({ maxHeight, value: high, domain }),
      stroke: fill,
      strokeWidth: 1,
      direction: isPositive ? 'positive' : 'negative',
    }),
    [domain, fill, high, isPositive, low, maxHeight, width, x]
  );
  const rectProps = React.useMemo(
    () => ({
      x: x + MARGIN,
      y: getY({ maxHeight, value: max, domain }),
      width: width - MARGIN * 2,
      height: getHeight({ maxHeight, value: max - min, domain }),
      fill: fill,
      direction: isPositive ? 'positive' : 'negative',
    }),
    [domain, fill, isPositive, max, maxHeight, min, width, x]
  );

  return (
    <>
      {renderLine(lineProps)}
      {renderRect(rectProps)}
    </>
  );
};

export default Candle;
