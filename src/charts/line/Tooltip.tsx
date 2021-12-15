import * as React from 'react';
import type { ViewProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { LineChartDimensionsContext } from './Chart';
import { CursorContext } from './Cursor';
import { LineChartPriceText, LineChartPriceTextProps } from './PriceText';
import { useLineChart } from './useLineChart';

type LineChartTooltipProps = Animated.AnimateProps<ViewProps> & {
  children?: React.ReactNode;
  xGutter?: number;
  yGutter?: number;
  cursorGutter?: number;
  position?: 'top' | 'bottom';
  textProps?: LineChartPriceTextProps;
  textStyle?: LineChartPriceTextProps['style'];
};

LineChartTooltip.displayName = 'LineChartTooltip';

export function LineChartTooltip({
  children,
  xGutter = 8,
  yGutter = 8,
  cursorGutter = 48,
  position = 'top',
  textProps,
  textStyle,
  ...props
}: LineChartTooltipProps) {
  const { width, height } = React.useContext(LineChartDimensionsContext);
  const { type } = React.useContext(CursorContext);
  const { currentX, currentY, isActive } = useLineChart();

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

    let translateYOffset = 0;
    if (position === 'top') {
      translateYOffset = elementHeight.value / 2 + cursorGutter;
      if (currentY.value - translateYOffset < yGutter) {
        translateYOffset = currentY.value - yGutter;
      }
    } else if (position === 'bottom') {
      translateYOffset = -(elementHeight.value / 2) - cursorGutter / 2;
      if (
        currentY.value - translateYOffset + elementHeight.value >
        height - yGutter
      ) {
        translateYOffset =
          currentY.value - (height - yGutter) + elementHeight.value;
      }
    }

    return {
      transform: [
        { translateX: currentX.value - translateXOffset },
        {
          translateY:
            type === 'crosshair'
              ? currentY.value - translateYOffset
              : position === 'top'
              ? yGutter
              : height - elementHeight.value - yGutter,
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
          position: 'absolute',
          padding: 4,
          alignSelf: 'flex-start',
        },
        animatedCursorStyle,
        props.style,
      ]}
    >
      {children || <LineChartPriceText style={[textStyle]} {...textProps} />}
    </Animated.View>
  );
}
