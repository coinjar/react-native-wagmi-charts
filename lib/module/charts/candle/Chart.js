import * as React from 'react';
import { Dimensions, View } from 'react-native';
import { useCandlestickChart } from './useCandlestickChart';
export const CandlestickChartDimensionsContext = /*#__PURE__*/React.createContext({
  width: 0,
  height: 0
});
const {
  width: screenWidth
} = Dimensions.get('window');
export function CandlestickChart({
  children,
  width = screenWidth,
  height = screenWidth,
  ...props
}) {
  const {
    setWidth,
    setHeight
  } = useCandlestickChart();
  React.useEffect(() => {
    setWidth(width);
    setHeight(height);
  }, [height, setHeight, setWidth, width]);
  const contextValue = React.useMemo(() => ({
    width,
    height
  }), [height, width]);
  return /*#__PURE__*/React.createElement(CandlestickChartDimensionsContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(View, props, children));
}
//# sourceMappingURL=Chart.js.map