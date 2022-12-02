"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPrice = getPrice;

var _reactNativeReanimated = require("react-native-reanimated");

function getPrice({
  y,
  domain,
  maxHeight
}) {
  'worklet';

  if (y === -1) return -1;
  return (0, _reactNativeReanimated.interpolate)(y, [0, maxHeight], domain.reverse(), _reactNativeReanimated.Extrapolate.CLAMP);
}
//# sourceMappingURL=getPrice.js.map