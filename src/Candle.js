import React from 'react';
import { Line, Rect } from 'react-native-svg';
import { getY, getHeight } from './utils';
const MARGIN = 2;
const Candle = ({
  candle,
  maxHeight,
  domain,
  positiveColor = '#10b981',
  negativeColor = '#ef4444',
  index,
  width,
  renderLine = (props) => React.createElement(Line, { ...props }),
  renderRect = (props) => React.createElement(Rect, { ...props }),
}) => {
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
  return React.createElement(
    React.Fragment,
    null,
    renderLine(lineProps),
    renderRect(rectProps)
  );
};
export default Candle;
