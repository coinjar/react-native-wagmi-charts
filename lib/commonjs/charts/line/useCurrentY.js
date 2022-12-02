"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCurrentY = useCurrentY;

var _react = require("react");

var _reactNativeReanimated = require("react-native-reanimated");

var _reactNativeRedash = require("react-native-redash");

var _Context = require("./Context");

var _Chart = require("./Chart");

function useCurrentY() {
  const {
    path,
    width
  } = (0, _react.useContext)(_Chart.LineChartDimensionsContext);
  const {
    currentX
  } = (0, _react.useContext)(_Context.LineChartContext);
  const parsedPath = (0, _react.useMemo)(() => path ? (0, _reactNativeRedash.parse)(path) : undefined, [path]);
  const currentY = (0, _reactNativeReanimated.useDerivedValue)(() => {
    if (!parsedPath) {
      return -1;
    }

    const boundedX = Math.min(width, currentX.value);
    return (0, _reactNativeRedash.getYForX)(parsedPath, boundedX) || 0;
  });
  return currentY;
}
//# sourceMappingURL=useCurrentY.js.map