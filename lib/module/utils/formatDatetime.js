/**
 * @worklet
 */
export function formatDatetime({
  value,
  locale = 'en-US',
  options = {}
}) {
  'worklet';

  const d = new Date(value);
  return d.toLocaleString(locale, options);
}
//# sourceMappingURL=formatDatetime.js.map