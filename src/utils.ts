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
    precision ||
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

export function formatDatetime({
  value,
  locale = 'en-US',
  options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
}: {
  value: number;
  locale?: string;
  options?: { [key: string]: string };
}) {
  'worklet';
  const d = new Date(value);
  return d.toLocaleTimeString(locale, options);
}
