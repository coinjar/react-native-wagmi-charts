"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getY = getY;

var _reactNativeReanimated = require("react-native-reanimated");

function getY({
  value,
  domain,
  maxHeight
}) {
  'worklet';

  return (0, _reactNativeReanimated.interpolate)(value, domain, [maxHeight, 0], _reactNativeReanimated.Extrapolate.CLAMP);
}
//# sourceMappingURL=getY.js.map