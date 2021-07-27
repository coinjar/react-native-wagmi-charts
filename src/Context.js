import * as React from 'react';
import { Dimensions } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { getDomain } from './utils';
export const CandlestickChartContext = React.createContext({
  currentX: { value: -1 },
  currentY: { value: -1 },
  data: [],
  height: 0,
  width: 0,
  domain: [0, 0],
  step: 0,
  setHeight: () => {},
  setWidth: () => {},
});
export const { width: screenWidth } = Dimensions.get('window');
export function CandlestickChartProvider({ children, data }) {
  const [width, setWidth] = React.useState(screenWidth);
  const [height, setHeight] = React.useState(screenWidth);
  const [step, setStep] = React.useState(0);
  const currentX = useSharedValue(-1);
  const currentY = useSharedValue(-1);
  const domain = React.useMemo(() => getDomain(data), [data]);
  React.useEffect(() => {
    const newStep = width / data.length;
    setStep(newStep);
  }, [data.length, width]);
  const contextValue = React.useMemo(
    () => ({
      currentX,
      currentY,
      data,
      width,
      height,
      domain,
      step,
      setStep,
      setHeight,
      setWidth,
    }),
    [currentX, currentY, data, domain, height, step, width]
  );
  return React.createElement(
    CandlestickChartContext.Provider,
    { value: contextValue },
    children
  );
}
