import * as React from 'react';
import type { StyleProp, TextStyle, ViewProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import {
  CandlestickChartPriceText,
  CandlestickChartPriceTextProps,
} from './PriceText';

export type CandlestickChartTooltipProps = ViewProps & {
  tooltipTextProps?: CandlestickChartPriceTextProps;
  textStyle?: Animated.AnimateStyle<StyleProp<TextStyle>>;
};

export type CandlestickChartTooltipContext = {
  position: Animated.SharedValue<'left' | 'right'>;
};

export const CandlestickChartTooltipContext =
  React.createContext<CandlestickChartTooltipContext>({
    position: { value: 'left' },
  });

export function CandlestickChartTooltip({
  tooltipTextProps = {},
  textStyle = {},
  ...props
}: CandlestickChartTooltipProps) {
  const { position } = React.useContext(CandlestickChartTooltipContext);

  const height = useSharedValue(0);

  const handleLayout = React.useCallback(
    (event) => {
      height.value = event.nativeEvent.layout.height;
    },
    [height]
  );

  const tooltip = useAnimatedStyle(() => ({
    backgroundColor: 'white',
    position: 'absolute',
    display: 'flex',
    padding: 4,
  }));
  const leftTooltip = useAnimatedStyle(() => ({
    left: 0,
    top: -(height.value / 2),
    opacity: position.value === 'left' ? 1 : 0,
  }));
  const rightTooltip = useAnimatedStyle(() => ({
    right: 0,
    top: -(height.value / 2),
    opacity: position.value === 'right' ? 1 : 0,
  }));

  return (
    <>
      <Animated.View
        onLayout={handleLayout}
        {...props}
        style={[tooltip, leftTooltip, props.style]}
      >
        <CandlestickChartPriceText
          {...tooltipTextProps}
          style={[{ fontSize: 14 }, tooltipTextProps.style, textStyle]}
        />
      </Animated.View>
      <Animated.View {...props} style={[tooltip, rightTooltip, props.style]}>
        <CandlestickChartPriceText
          {...tooltipTextProps}
          style={[{ fontSize: 14 }, tooltipTextProps.style, textStyle]}
        />
      </Animated.View>
    </>
  );
}
