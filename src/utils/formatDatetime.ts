/**
 * @worklet
 */
export function formatDatetime({
  value,
  locale = 'en-US',
  options = {},
}: {
  value: number;
  locale?: string;
  options?: Intl.DateTimeFormatOptions;
}) {
  'worklet';
  const d = new Date(value);
  return d.toLocaleString(locale, options);
}
