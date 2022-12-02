import React, { createContext, useContext, useMemo } from 'react';
export const DefaultLineChartId = '__LineChartData';
const LineChartDataContext = /*#__PURE__*/createContext({
  [DefaultLineChartId]: []
});
export function LineChartDataProvider({
  children,
  data
}) {
  const contextValue = useMemo(() => {
    if (Array.isArray(data)) {
      return {
        [DefaultLineChartId]: data
      };
    }

    return data;
  }, [data]);
  return /*#__PURE__*/React.createElement(LineChartDataContext.Provider, {
    value: contextValue
  }, children);
}
const LineChartIdContext = /*#__PURE__*/createContext(undefined);
export function LineChartIdProvider({
  id,
  children
}) {
  return /*#__PURE__*/React.createElement(LineChartIdContext.Provider, {
    value: id
  }, children);
}
export const useLineChartId = () => useContext(LineChartIdContext);
export function useLineChartData({
  id
}) {
  const dataContext = useContext(LineChartDataContext);
  validateLineChartId(dataContext, id);
  const data = dataContext[id || DefaultLineChartId];
  return useMemo(() => ({
    data
  }), [data]);
}

function validateLineChartId(dataContext, id) {
  if (id != null && !dataContext[id]) {
    const otherIds = Object.keys(dataContext).filter(otherId => otherId !== DefaultLineChartId);
    const singular = otherIds.length <= 1;
    const joinedIds = otherIds.join(', ');
    const suggestion = otherIds.length ? `Did you mean to use ${singular ? 'this ID' : 'one of these IDs'}: ${joinedIds}` : `You didn't pass any IDs to your <LineChart.Provider />'s data prop. Did you mean to pass an array instead?`;
    console.warn(`[react-native-wagmi-charts] Invalid usage of "id" prop on LineChart. You passed id="${id}", but this ID does not exist in your <LineChart.Provider />'s "data" prop.

${suggestion}`);
  } else if (id == null && !dataContext[DefaultLineChartId]) {
    const otherIds = Object.keys(dataContext);
    const singular = otherIds.length <= 1;
    const joinedIds = otherIds.join(', ');
    const suggestion = otherIds.length ? `Did you mean to use ${singular ? 'this ID' : 'one of these IDs'}: ${joinedIds}` : `You didn't pass any IDs to your <LineChart.Provider />'s data prop. Did you mean to pass an array instead?`;
    console.error(`[react-native-wagmi-charts] Missing data "id" prop on LineChart. You must pass an id prop to <LineChart /> when using a dictionary for your data.

${suggestion}
    `);
  }
}
//# sourceMappingURL=Data.js.map