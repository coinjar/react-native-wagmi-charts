import React from 'react';
import Animated, { withTiming, useAnimatedProps } from 'react-native-reanimated';
import { Line, Rect } from 'react-native-svg';
import { getY, getHeight } from './utils';
const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedLine = Animated.createAnimatedComponent(Line);
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
  renderLine = props => props.useAnimations ? /*#__PURE__*/React.createElement(AnimatedLine, props) : /*#__PURE__*/React.createElement(Line, props),
  renderRect = props => props.useAnimations ? /*#__PURE__*/React.createElement(AnimatedRect, props) : /*#__PURE__*/React.createElement(Rect, props)
}) => {
  const {
    close,
    open,
    high,
    low
  } = candle;
  const isPositive = close > open;
  const fill = isPositive ? positiveColor : negativeColor;
  const x = index * width;
  const max = Math.max(open, close);
  const min = Math.min(open, close);
  const lineProps = React.useMemo(() => ({
    stroke: fill,
    strokeWidth: 1,
    direction: isPositive ? 'positive' : 'negative',
    x1: x + width / 2,
    y1: getY({
      maxHeight,
      value: low,
      domain
    }),
    x2: x + width / 2,
    y2: getY({
      maxHeight,
      value: high,
      domain
    }),
    ...overrideLineProps
  }), [domain, fill, high, isPositive, low, maxHeight, overrideLineProps, width, x]);
  const animatedLineProps = useAnimatedProps(() => ({
    x1: withTiming(x + width / 2),
    y1: withTiming(getY({
      maxHeight,
      value: low,
      domain
    })),
    x2: withTiming(x + width / 2),
    y2: withTiming(getY({
      maxHeight,
      value: high,
      domain
    }))
  }));
  const rectProps = React.useMemo(() => ({
    width: width - margin * 2,
    fill: fill,
    direction: isPositive ? 'positive' : 'negative',
    x: x + margin,
    y: getY({
      maxHeight,
      value: max,
      domain
    }),
    height: getHeight({
      maxHeight,
      value: max - min,
      domain
    }),
    ...overrideRectProps
  }), [domain, fill, isPositive, margin, max, maxHeight, min, overrideRectProps, width, x]);
  const animatedRectProps = useAnimatedProps(() => ({
    x: withTiming(x + margin),
    y: withTiming(getY({
      maxHeight,
      value: max,
      domain
    })),
    height: withTiming(getHeight({
      maxHeight,
      value: max - min,
      domain
    }))
  }));
  return /*#__PURE__*/React.createElement(React.Fragment, null, renderLine({ ...lineProps,
    useAnimations,
    ...(useAnimations ? {
      animatedProps: animatedLineProps
    } : {})
  }), renderRect({ ...rectProps,
    useAnimations,
    ...(useAnimations ? {
      animatedProps: animatedRectProps
    } : {})
  }));
};
//# sourceMappingURL=Candle.js.map