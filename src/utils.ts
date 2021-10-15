import * as React from 'react';

/**
 * @worklet
 */
export function formatPrice({
  value: _value,
  defaultPrice: _defaultPrice = '',
  precision,
}: {
  value: string;
  defaultPrice?: string;
  precision?: number;
}) {
  'worklet';

  let defaultPrice = _defaultPrice;
  if (typeof defaultPrice === 'number') {
    defaultPrice = (defaultPrice as number).toString();
  }

  let value = _value || defaultPrice?.replace?.(',', '');
  if (!value) {
    return `0.00`;
  }

  let decimals =
    precision ??
    (Number(value) < 1
      ? Math.min(8, value.toString().slice(2).search(/[^0]/g) + 3)
      : 2);

  let res = `${Number(value).toFixed(decimals)}`;
  const vals = res.split('.');
  if (vals.length > 0) {
    res = vals[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (vals.length === 2) {
      return res + '.' + vals[1];
    }
  }
  return res;
}

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

export function usePrevious<T>(value: T) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = React.useRef<T>();
  // Store current value in ref
  React.useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}
