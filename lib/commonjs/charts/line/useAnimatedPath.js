"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useAnimatedPath;

var _reactNativeReanimated = require("react-native-reanimated");

var _utils = require("../../utils");

var _utils2 = require("./utils");

function useAnimatedPath({
  enabled = true,
  path
}) {
  const transition = (0, _reactNativeReanimated.useSharedValue)(0);
  const previousPath = (0, _utils.usePrevious)(path);
  (0, _reactNativeReanimated.useAnimatedReaction)(() => {
    return path;
  }, (_, previous) => {
    if (previous) {
      transition.value = 0;
      transition.value = (0, _reactNativeReanimated.withTiming)(1);
    }
  }, [path]);
  const animatedProps = (0, _reactNativeReanimated.useAnimatedProps)(() => {
    let d = path || '';

    if (previousPath && enabled) {
      const pathInterpolator = (0, _utils2.interpolatePath)(previousPath, path, null);
      d = pathInterpolator(transition.value);
    }

    return {
      d
    };
  });
  return {
    animatedProps
  };
}
//# sourceMappingURL=useAnimatedPath.js.map