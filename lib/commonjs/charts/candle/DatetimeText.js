"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CandlestickChartDatetimeText = CandlestickChartDatetimeText;

var React = _interopRequireWildcard(require("react"));

var _useDatetime = require("./useDatetime");

var _AnimatedText = require("../../components/AnimatedText");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function CandlestickChartDatetimeText({
  locale,
  options,
  format,
  variant = 'formatted',
  style
}) {
  const datetime = (0, _useDatetime.useCandlestickChartDatetime)({
    format,
    locale,
    options
  });
  return /*#__PURE__*/React.createElement(_AnimatedText.AnimatedText, {
    text: datetime[variant],
    style: style
  });
}
//# sourceMappingURL=DatetimeText.js.map