"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatDatetime = formatDatetime;

/**
 * @worklet
 */
function formatDatetime({
  value,
  locale = 'en-US',
  options = {}
}) {
  'worklet';

  const d = new Date(value);
  return d.toLocaleString(locale, options);
}
//# sourceMappingURL=formatDatetime.js.map