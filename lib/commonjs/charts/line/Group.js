"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineChartGroup = LineChartGroup;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactKeyedFlattenChildren = _interopRequireDefault(require("react-keyed-flatten-children"));

var _Chart = require("./Chart");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function LineChartGroup({
  children,
  ...props
}) {
  const flatChildren = (0, _reactKeyedFlattenChildren.default)(children);

  const flatChildrenCount = _react.Children.count(flatChildren);

  return /*#__PURE__*/_react.default.createElement(_reactNative.View, props, _react.Children.map(flatChildren, (child, index) => {
    const isLast = index === flatChildrenCount - 1;

    if (!isLast && child.type === _Chart.LineChart) {
      return /*#__PURE__*/(0, _react.cloneElement)(child, {
        absolute: true
      });
    }

    return child;
  }));
}
//# sourceMappingURL=Group.js.map