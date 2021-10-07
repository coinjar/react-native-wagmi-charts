import * as React from 'react';

import { CandlestickChartContext } from './Context';
import type { TContext } from './types';

export function useCandlestickChart(): TContext {
  return React.useContext(CandlestickChartContext);
}
