import * as React from 'react';
import { runOnJS, useAnimatedReaction, useSharedValue } from 'react-native-reanimated';
import { LineChartDataProvider } from './Data';
import { getDomain, lineChartDataPropToArray } from './utils';
export const LineChartContext = /*#__PURE__*/React.createContext({
  currentX: {
    value: -1
  },
  currentIndex: {
    value: -1
  },
  domain: [0, 0],
  isActive: {
    value: false
  },
  yDomain: {
    min: 0,
    max: 0
  },
  xLength: 0
});
LineChartProvider.displayName = 'LineChartProvider';
export function LineChartProvider({
  children,
  data = [],
  yRange,
  onCurrentIndexChange,
  xLength
}) {
  const currentX = useSharedValue(-1);
  const currentIndex = useSharedValue(-1);
  const isActive = useSharedValue(false);
  const domain = React.useMemo(() => getDomain(Array.isArray(data) ? data : Object.values(data)[0]), [data]);
  const contextValue = React.useMemo(() => {
    var _yRange$min, _yRange$max;

    const values = lineChartDataPropToArray(data).map(({
      value
    }) => value);
    return {
      currentX,
      currentIndex,
      isActive,
      domain,
      yDomain: {
        min: (_yRange$min = yRange === null || yRange === void 0 ? void 0 : yRange.min) !== null && _yRange$min !== void 0 ? _yRange$min : Math.min(...values),
        max: (_yRange$max = yRange === null || yRange === void 0 ? void 0 : yRange.max) !== null && _yRange$max !== void 0 ? _yRange$max : Math.max(...values)
      },
      xLength: xLength !== null && xLength !== void 0 ? xLength : (Array.isArray(data) ? data : Object.values(data)[0]).length
    };
  }, [currentIndex, currentX, data, domain, isActive, yRange === null || yRange === void 0 ? void 0 : yRange.max, yRange === null || yRange === void 0 ? void 0 : yRange.min, xLength]);
  useAnimatedReaction(() => currentIndex.value, (x, prevX) => {
    if (x !== -1 && x !== prevX && onCurrentIndexChange) {
      runOnJS(onCurrentIndexChange)(x);
    }
  });
  return /*#__PURE__*/React.createElement(LineChartDataProvider, {
    data: data
  }, /*#__PURE__*/React.createElement(LineChartContext.Provider, {
    value: contextValue
  }, children));
}
//# sourceMappingURL=Context.js.map