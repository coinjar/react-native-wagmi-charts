import { interpolate, Extrapolate } from 'react-native-reanimated';

import type { TCandle, TDomain } from './types';

// Taken from Rainbow Wallet: https://github.com/rainbow-me/rainbow/blob/develop/src/components/expanded-state/chart/chart-data-labels/ChartPriceLabel.js#L41
export function formatPrice({
  value: _value,
  defaultPrice: _defaultPrice = '',
}: {
  value: string;
  defaultPrice?: string;
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
    Number(value) < 1
      ? Math.min(8, value.toString().slice(2).search(/[^0]/g) + 3)
      : 2;
  if (defaultPrice) {
    decimals = defaultPrice?.split('.')?.[1]?.length || 0;
  }

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

export const formatDatetime = (value: string) => {
  'worklet';
  const d = new Date(value);
  return d.toLocaleTimeString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const getDomain = (rows: TCandle[]): [number, number] => {
  'worklet';
  const values = rows.map(({ high, low }) => [high, low]).flat();
  return [Math.min(...values), Math.max(...values)];
};

export const scaleY = ({
  value,
  domain,
  maxHeight,
}: {
  value: number;
  domain: TDomain;
  maxHeight: number;
}) => {
  'worklet';
  return interpolate(value, domain, [maxHeight, 0], Extrapolate.CLAMP);
};

export const scaleBody = ({
  value,
  domain,
  maxHeight,
}: {
  value: number;
  domain: TDomain;
  maxHeight: number;
}) => {
  'worklet';
  return interpolate(
    value,
    [0, Math.max(...domain) - Math.min(...domain)],
    [0, maxHeight],
    Extrapolate.CLAMP
  );
};

export const scaleYInvert = ({
  y,
  domain,
  maxHeight,
}: {
  y: number;
  domain: TDomain;
  maxHeight: number;
}) => {
  'worklet';
  return interpolate(y, [0, maxHeight], domain.reverse(), Extrapolate.CLAMP);
};
