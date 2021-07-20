import React from 'react';
import { Line, Rect } from 'react-native-svg';

import { scaleY, scaleBody } from './utils';

const MARGIN = 2;

export type Candle = {
  date: String;
  open: number;
  high: number;
  low: number;
  close: number;
};

type CandleProps = {
  candle: Candle;
  domain: number[];
  maxHeight: number;
  index: number;
  width: number;
};

const Candle = ({ candle, maxHeight, domain, index, width }: CandleProps) => {
  const { close, open, high, low } = candle;
  const fill = close > open ? '#4AFA9A' : '#E33F64';
  const x = index * width;
  const max = Math.max(open, close);
  const min = Math.min(open, close);
  return (
    <>
      <Line
        x1={x + width / 2}
        y1={scaleY({ maxHeight, value: low, domain })}
        x2={x + width / 2}
        y2={scaleY({ maxHeight, value: high, domain })}
        stroke={fill}
        strokeWidth={1}
      />
      <Rect
        x={x + MARGIN}
        y={scaleY({ maxHeight, value: max, domain })}
        width={width - MARGIN * 2}
        height={scaleBody({ maxHeight, value: max - min, domain })}
        fill={fill}
      />
    </>
  );
};

export default Candle;
