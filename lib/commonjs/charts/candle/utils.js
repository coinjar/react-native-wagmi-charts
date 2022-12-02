"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDomain = getDomain;
exports.getY = getY;
exports.getHeight = getHeight;
exports.getPrice = getPrice;

var _reactNativeReanimated = require("react-native-reanimated");

function getDomain(rows) {
  'worklet';

  const values = rows.map(({
    high,
    low
  }) => [high, low]).flat();
  const min = Math.min(...values);
  const max = Math.max(...values);
  return [min - (max - min) * 0.025, max + (max - min) * 0.025];
}

function getY({
  value,
  domain,
  maxHeight
}) {
  'worklet';

  return (0, _reactNativeReanimated.interpolate)(value, domain, [maxHeight, 0], _reactNativeReanimated.Extrapolate.CLAMP);
}

function getHeight({
  value,
  domain,
  maxHeight
}) {
  'worklet';

  return (0, _reactNativeReanimated.interpolate)(value, [0, Math.max(...domain) - Math.min(...domain)], [0, maxHeight], _reactNativeReanimated.Extrapolate.CLAMP);
}

function getPrice({
  y,
  domain,
  maxHeight
}) {
  'worklet';

  if (y === -1) return -1;
  return (0, _reactNativeReanimated.interpolate)(y, [0, maxHeight], domain.reverse(), _reactNativeReanimated.Extrapolate.CLAMP);
}
//# sourceMappingURL=utils.js.map