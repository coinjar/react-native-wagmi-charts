"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimatedText = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// forked from https://github.com/wcandillon/react-native-redash/blob/master/src/ReText.tsx
_reactNativeReanimated.default.addWhitelistedNativeProps({
  text: true
});

const AnimatedTextInput = _reactNativeReanimated.default.createAnimatedComponent(_reactNative.TextInput);

const AnimatedText = ({
  text,
  style
}) => {
  const inputRef = _react.default.useRef(null); // eslint-disable-line @typescript-eslint/no-explicit-any


  if (_reactNative.Platform.OS === 'web') {
    // For some reason, the worklet reaction evaluates upfront regardless of any
    // conditionals within it, causing Android to crash upon the invokation of `setNativeProps`.
    // We are going to break the rules of hooks here so it doesn't invoke `useAnimatedReaction`
    // for platforms outside of the web.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    (0, _reactNativeReanimated.useAnimatedReaction)(() => {
      return text.value;
    }, (data, prevData) => {
      if (data !== prevData && inputRef.current) {
        inputRef.current.value = data;
      }
    });
  }

  const animatedProps = (0, _reactNativeReanimated.useAnimatedProps)(() => {
    return {
      text: text.value // Here we use any because the text prop is not available in the type
      // eslint-disable-next-line @typescript-eslint/no-explicit-any

    };
  });
  return /*#__PURE__*/_react.default.createElement(AnimatedTextInput, {
    underlineColorAndroid: "transparent",
    editable: false,
    ref: _reactNative.Platform.select({
      web: inputRef
    }),
    value: text.value,
    style: [styles.text, style],
    animatedProps: animatedProps
  });
};

exports.AnimatedText = AnimatedText;

const styles = _reactNative.StyleSheet.create({
  text: {
    color: 'black'
  }
});
//# sourceMappingURL=AnimatedText.js.map