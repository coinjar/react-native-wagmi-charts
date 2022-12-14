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
  high,
  low,
  yRange,
  onCurrentIndexChange,
  xLength
}) {
  const currentX = useSharedValue(-1);
  const currentIndex = useSharedValue(-1);
  const isActive = useSharedValue(false);
  const trusteeData = React.useMemo(() => {
    if (!high && !low) return data;
    return data === null || data === void 0 ? void 0 : data.map(item => {
      const _item = { ...item
      };

      if ((_item === null || _item === void 0 ? void 0 : _item.value) * 1 > high * 1) {
        _item.value = high;
      } else if ((_item === null || _item === void 0 ? void 0 : _item.value) * 1 < low * 1) {
        _item.value = low;
      }

      return _item;
    });
  }, [data]);
  const domain = React.useMemo(() => getDomain(Array.isArray(trusteeData) ? trusteeData : Object.values(trusteeData)[0]), [trusteeData]);
  const contextValue = React.useMemo(() => {
    var _yRange$min, _yRange$max;

    const values = lineChartDataPropToArray(trusteeData).map(({
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
      xLength: xLength !== null && xLength !== void 0 ? xLength : (Array.isArray(trusteeData) ? trusteeData : Object.values(trusteeData)[0]).length
    };
  }, [currentIndex, currentX, trusteeData, domain, isActive, yRange === null || yRange === void 0 ? void 0 : yRange.max, yRange === null || yRange === void 0 ? void 0 : yRange.min, xLength]);
  useAnimatedReaction(() => currentIndex.value, (x, prevX) => {
    if (x !== -1 && x !== prevX && onCurrentIndexChange) {
      runOnJS(onCurrentIndexChange)(x);
    }
  });
  return /*#__PURE__*/React.createElement(LineChartDataProvider, {
    data: trusteeData
  }, /*#__PURE__*/React.createElement(LineChartContext.Provider, {
    value: contextValue
  }, children));
}
//# sourceMappingURL=Context.js.map