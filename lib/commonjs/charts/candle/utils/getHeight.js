"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHeight = getHeight;

var _reactNativeReanimated = require("react-native-reanimated");

function getHeight({
  value,
  domain,
  maxHeight
}) {
  'worklet';

  return (0, _reactNativeReanimated.interpolate)(value, [0, Math.max(...domain) - Math.min(...domain)], [0, maxHeight], _reactNativeReanimated.Extrapolate.CLAMP);
}
//# sourceMappingURL=getHeight.js.map