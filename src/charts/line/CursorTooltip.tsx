import * as React from 'react';
import type { ViewProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { CursorContext } from './Cursor';
import { LineChartPriceText, LineChartPriceTextProps } from './PriceText';
import { useLineChart } from './useLineChart';

type LineChartCursorTooltipProps = Animated.AnimateProps<ViewProps> & {
  xGutter?: number;
  yGutter?: number;
  position?: 'top' | 'bottom';
  textProps?: LineChartPriceTextProps;
  textStyle?: LineChartPriceTextProps['style'];
};

export function LineChartCursorTooltip({
  xGutter = 8,
  yGutter = 80,
  position = 'top',
  textProps,
  textStyle,
  ...props
}: LineChartCursorTooltipProps) {
  const { type } = React.useContext(CursorContext);
  const { currentX, currentY, isActive, height, width } = useLineChart();

  const x = useSharedValue(0);
  const elementWidth = useSharedValue(0);
  const elementHeight = useSharedValue(0);

  const handleLayout = React.useCallback(
    (event) => {
      x.value = event.nativeEvent.layout.x;
      elementWidth.value = event.nativeEvent.layout.width;
      elementHeight.value = event.nativeEvent.layout.height;
    },
    [elementHeight, elementWidth, x]
  );

  const animatedCursorStyle = useAnimatedStyle(() => {
    let translateXOffset = elementWidth.value / 2;
    if (currentX.value < elementWidth.value / 2 + xGutter) {
      const xOffset = elementWidth.value / 2 + xGutter - currentX.value;
      translateXOffset = translateXOffset - xOffset;
    }
    if (currentX.value > width - elementWidth.value / 2 - xGutter) {
      const xOffset =
        currentX.value - (width - elementWidth.value / 2 - xGutter);
      translateXOffset = translateXOffset + xOffset;
    }
    return {
      transform: [
        { translateX: currentX.value - translateXOffset },
        {
          translateY:
            type === 'crosshair'
              ? currentY.value - yGutter
              : position === 'top'
              ? -height
              : -elementHeight.value,
        },
      ],
      opacity: isActive.value ? 1 : 0,
    };
  });

  return (
    <Animated.View
      onLayout={handleLayout}
      {...props}
      style={[
        {
          backgroundColor: 'black',
          padding: 4,
          alignSelf: 'flex-start',
        },
        animatedCursorStyle,
        props.style,
      ]}
    >
      <LineChartPriceText
        style={[{ color: 'white' }, textStyle]}
        {...textProps}
      />
    </Animated.View>
  );
}
