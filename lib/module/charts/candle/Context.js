import * as React from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { getDomain } from './utils';
export const CandlestickChartContext = /*#__PURE__*/React.createContext({
  currentX: {
    value: -1
  },
  currentY: {
    value: -1
  },
  data: [],
  height: 0,
  width: 0,
  domain: [0, 0],
  step: 0,
  setWidth: () => undefined,
  setHeight: () => undefined
});
export function CandlestickChartProvider({
  children,
  data = []
}) {
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const [step, setStep] = React.useState(0);
  const currentX = useSharedValue(-1);
  const currentY = useSharedValue(-1);
  const domain = React.useMemo(() => getDomain(data), [data]);
  React.useEffect(() => {
    if (data.length) {
      const newStep = width / data.length;
      setStep(newStep);
    }
  }, [data.length, width]);
  const contextValue = React.useMemo(() => ({
    currentX,
    currentY,
    data,
    width,
    height,
    domain,
    step,
    setWidth,
    setHeight,
    setStep
  }), [currentX, currentY, data, domain, height, step, width]);
  return /*#__PURE__*/React.createElement(CandlestickChartContext.Provider, {
    value: contextValue
  }, children);
}
//# sourceMappingURL=Context.js.map