"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineChartHoverTrap = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeRedash = require("react-native-redash");

var _Chart = require("../../line/Chart");

var _useLineChart = require("../../line/useLineChart");

var _ExecutionEnvironment = require("fbjs/lib/ExecutionEnvironment");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// @ts-expect-error missing types
let isEnabled = false; // the following logic comes from the creator of react-native-web
// https://gist.github.com/necolas/1c494e44e23eb7f8c5864a2fac66299a
// it's also used by MotiPressable's hover interactions
// https://github.com/nandorojo/moti/blob/master/packages/interactions/src/pressable/hoverable.tsx

if (_ExecutionEnvironment.canUseDOM) {
  /**
   * Web browsers emulate mouse events (and hover states) after touch events.
   * This code infers when the currently-in-use modality supports hover
   * (including for multi-modality devices) and considers "hover" to be enabled
   * if a mouse movement occurs more than 1 second after the last touch event.
   * This threshold is long enough to account for longer delays between the
   * browser firing touch and mouse events on low-powered devices.
   */
  const HOVER_THRESHOLD_MS = 1000;
  let lastTouchTimestamp = 0;

  function enableHover() {
    if (isEnabled || Date.now() - lastTouchTimestamp < HOVER_THRESHOLD_MS) {
      return;
    }

    isEnabled = true;
  }

  function disableHover() {
    lastTouchTimestamp = Date.now();

    if (isEnabled) {
      isEnabled = false;
    }
  }

  document.addEventListener('touchstart', disableHover, true);
  document.addEventListener('touchmove', disableHover, true);
  document.addEventListener('mousemove', enableHover, true);
}

function isHoverEnabled() {
  return isEnabled;
}

const LineChartHoverTrap = () => {
  const {
    width,
    path
  } = React.useContext(_Chart.LineChartDimensionsContext);
  const {
    currentX,
    currentIndex,
    isActive,
    data
  } = (0, _useLineChart.useLineChart)();
  const parsedPath = React.useMemo(() => path ? (0, _reactNativeRedash.parse)(path) : undefined, [path]);
  const onMouseMove = React.useCallback(({
    x
  }) => {
    if (isHoverEnabled()) {
      if (parsedPath) {
        const boundedX = Math.min(x, width);
        isActive.value = true;
        currentX.value = boundedX; // on Web, we could drag the cursor to be negative, breaking it
        // so we clamp the index at 0 to fix it
        // https://github.com/coinjar/react-native-wagmi-charts/issues/24

        const minIndex = 0;
        const boundedIndex = Math.max(minIndex, Math.round(boundedX / width / (1 / (data.length - 1))));
        currentIndex.value = boundedIndex;
      }
    } else {
      isActive.value = false;
      currentIndex.value = -1;
    }
  }, [currentIndex, currentX, data.length, isActive, parsedPath, width]);
  const onMouseLeave = React.useCallback(() => {
    isActive.value = false;
    currentIndex.value = -1;
  }, [currentIndex, isActive]);
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: _reactNative.StyleSheet.absoluteFill // @ts-expect-error mouse move event
    ,
    onMouseMove: React.useCallback( // eslint-disable-next-line no-undef
    e => {
      let rect = e.currentTarget.getBoundingClientRect();
      let x = e.clientX - rect.left; // x position within the element.

      onMouseMove({
        x
      });
    }, [onMouseMove]),
    onMouseLeave: onMouseLeave
  });
};

exports.LineChartHoverTrap = LineChartHoverTrap;
//# sourceMappingURL=index.web.js.map