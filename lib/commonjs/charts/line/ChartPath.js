"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineChartPathWrapper = LineChartPathWrapper;
exports.LineChartPathContext = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeSvg = require("react-native-svg");

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _reactKeyedFlattenChildren = _interopRequireDefault(require("react-keyed-flatten-children"));

var _Chart = require("./Chart");

var _Path = require("./Path");

var _useLineChart = require("./useLineChart");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const BACKGROUND_COMPONENTS = ['LineChartHighlight', 'LineChartHorizontalLine', 'LineChartGradient', 'LineChartDot'];
const FOREGROUND_COMPONENTS = ['LineChartHighlight', 'LineChartDot'];

const AnimatedSVG = _reactNativeReanimated.default.createAnimatedComponent(_reactNativeSvg.Svg);

const LineChartPathContext = /*#__PURE__*/React.createContext({
  color: '',
  isInactive: false,
  isTransitionEnabled: true
});
exports.LineChartPathContext = LineChartPathContext;
LineChartPathWrapper.displayName = 'LineChartPathWrapper';

function LineChartPathWrapper({
  animationDuration = 300,
  animationProps = {},
  children,
  color = 'black',
  inactiveColor,
  width: strokeWidth = 3,
  widthOffset = 20,
  pathProps = {},
  showInactivePath = true,
  animateOnMount,
  mountAnimationDuration = animationDuration,
  mountAnimationProps = animationProps
}) {
  var _pathProps$isTransiti, _pathProps$isTransiti2;

  const {
    height,
    pathWidth,
    width
  } = React.useContext(_Chart.LineChartDimensionsContext);
  const {
    currentX,
    isActive
  } = (0, _useLineChart.useLineChart)();
  const isMounted = (0, _reactNativeReanimated.useSharedValue)(false);
  const hasMountedAnimation = (0, _reactNativeReanimated.useSharedValue)(false);
  React.useEffect(() => {
    isMounted.value = true; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); ////////////////////////////////////////////////

  const svgProps = (0, _reactNativeReanimated.useAnimatedProps)(() => {
    const shouldAnimateOnMount = animateOnMount === 'foreground';
    const inactiveWidth = !isMounted.value && shouldAnimateOnMount ? 0 : pathWidth;
    let duration = shouldAnimateOnMount && !hasMountedAnimation.value ? mountAnimationDuration : animationDuration;
    const props = shouldAnimateOnMount && !hasMountedAnimation.value ? mountAnimationProps : animationProps;

    if (isActive.value) {
      duration = 0;
    }

    return {
      width: (0, _reactNativeReanimated.withTiming)(isActive.value ? // on Web, <svg /> elements don't support negative widths
      // https://github.com/coinjar/react-native-wagmi-charts/issues/24#issuecomment-955789904
      Math.max(currentX.value, 0) : inactiveWidth + widthOffset, Object.assign({
        duration
      }, props), () => {
        hasMountedAnimation.value = true;
      })
    };
  });
  const viewSize = React.useMemo(() => ({
    width,
    height
  }), [width, height]); ////////////////////////////////////////////////

  let backgroundChildren;
  let foregroundChildren;

  if (children) {
    const iterableChildren = (0, _reactKeyedFlattenChildren.default)(children);
    backgroundChildren = iterableChildren.filter(child => {
      var _child$type;

      return (// @ts-ignore
        BACKGROUND_COMPONENTS.includes(child === null || child === void 0 ? void 0 : (_child$type = child.type) === null || _child$type === void 0 ? void 0 : _child$type.displayName)
      );
    });
    foregroundChildren = iterableChildren.filter(child => {
      var _child$type2;

      return (// @ts-ignore
        FOREGROUND_COMPONENTS.includes(child === null || child === void 0 ? void 0 : (_child$type2 = child.type) === null || _child$type2 === void 0 ? void 0 : _child$type2.displayName)
      );
    });
  } ////////////////////////////////////////////////


  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(LineChartPathContext.Provider, {
    value: {
      color,
      isInactive: showInactivePath,
      isTransitionEnabled: (_pathProps$isTransiti = pathProps.isTransitionEnabled) !== null && _pathProps$isTransiti !== void 0 ? _pathProps$isTransiti : true
    }
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: viewSize
  }, /*#__PURE__*/React.createElement(_reactNativeSvg.Svg, {
    width: width,
    height: height
  }, /*#__PURE__*/React.createElement(_Path.LineChartPath, _extends({
    color: color,
    inactiveColor: inactiveColor,
    width: strokeWidth
  }, pathProps)), backgroundChildren))), /*#__PURE__*/React.createElement(LineChartPathContext.Provider, {
    value: {
      color,
      isInactive: false,
      isTransitionEnabled: (_pathProps$isTransiti2 = pathProps.isTransitionEnabled) !== null && _pathProps$isTransiti2 !== void 0 ? _pathProps$isTransiti2 : true
    }
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: _reactNative.StyleSheet.absoluteFill
  }, /*#__PURE__*/React.createElement(AnimatedSVG, {
    animatedProps: svgProps,
    height: height
  }, /*#__PURE__*/React.createElement(_Path.LineChartPath, _extends({
    color: color,
    width: strokeWidth
  }, pathProps)), foregroundChildren))));
}
//# sourceMappingURL=ChartPath.js.map