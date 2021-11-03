import type { TLineChartData } from './types';
import React, { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { TLineChartDataProp } from './types';

export const DefaultLineChartId = '__LineChartData';

export type LineChartDataContext = {
  [key: string]: TLineChartData;
};

const LineChartDataContext = createContext<LineChartDataContext>({
  [DefaultLineChartId]: [],
});

export type LineChartDataProviderProps = {
  children: ReactNode;
  data: TLineChartDataProp;
};

export function LineChartDataProvider({
  children,
  data,
}: LineChartDataProviderProps) {
  const contextValue = useMemo<LineChartDataContext>(() => {
    if (Array.isArray(data)) {
      return {
        [DefaultLineChartId]: data,
      };
    }
    return data;
  }, [data]);

  return (
    <LineChartDataContext.Provider value={contextValue}>
      {children}
    </LineChartDataContext.Provider>
  );
}

const LineChartIdContext = createContext<string | undefined>(undefined);

export function LineChartIdProvider({
  id,
  children,
}: {
  id?: string;
  children: ReactNode;
}) {
  return (
    <LineChartIdContext.Provider value={id}>
      {children}
    </LineChartIdContext.Provider>
  );
}

export const useLineChartId = () => useContext(LineChartIdContext);

export function useLineChartData({ id }: { id?: string }) {
  const dataContext = useContext(LineChartDataContext);

  validateLineChartId(dataContext, id);

  const data = dataContext[id || DefaultLineChartId];

  return useMemo(() => ({ data }), [data]);
}

function validateLineChartId(dataContext: LineChartDataContext, id?: string) {
  if (id != null && !dataContext[id]) {
    const otherIds = Object.keys(dataContext).filter(
      (otherId) => otherId !== DefaultLineChartId
    );
    const singular = otherIds.length <= 1;

    const joinedIds = otherIds.join(', ');

    const suggestion = otherIds.length
      ? `Did you mean to use ${
          singular ? 'this ID' : 'one of these IDs'
        }: ${joinedIds}`
      : `You didn't pass any IDs to your <LineChart.Provider />'s data prop. Did you mean to pass an array instead?`;

    console.warn(
      `[react-native-wagmi-charts] Invalid usage of "id" prop on LineChart. You passed id="${id}", but this ID does not exist in your <LineChart.Provider />'s "data" prop.

${suggestion}`
    );
  } else if (id == null && !dataContext[DefaultLineChartId]) {
    const otherIds = Object.keys(dataContext);
    const singular = otherIds.length <= 1;

    const joinedIds = otherIds.join(', ');
    const suggestion = otherIds.length
      ? `Did you mean to use ${
          singular ? 'this ID' : 'one of these IDs'
        }: ${joinedIds}`
      : `You didn't pass any IDs to your <LineChart.Provider />'s data prop. Did you mean to pass an array instead?`;

    console.error(`[react-native-wagmi-charts] Missing data "id" prop on LineChart. You must pass an id prop to <LineChart /> when using a dictionary for your data.

${suggestion}
    `);
  }
}
