import * as React from 'react';
import type { ViewProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

import { LineChartDimensionsContext } from './Chart';
import { CursorContext } from './Cursor';
import { LineChartPriceText, LineChartPriceTextProps } from './PriceText';
import { useLineChart } from './useLineChart';
import { getYForX, parse } from 'react-native-redash';
import { useMemo } from 'react';

export type LineChartTooltipProps = Animated.AnimateProps<ViewProps> & {
  children?: React.ReactNode;
  xGutter?: number;
  yGutter?: number;
  cursorGutter?: number;
  position?: 'top' | 'bottom';
  textProps?: LineChartPriceTextProps;
  textStyle?: LineChartPriceTextProps['style'];

  at?: number;
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
  at,
  ...props
}: LineChartTooltipProps) {
  const { width, height, path } = React.useContext(LineChartDimensionsContext);
  const { type } = React.useContext(CursorContext);
  const { currentX, currentY, isActive, data } = useLineChart();
  const dataLength = data.length;

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

  // TODO: put these two in context, as they are used in other parts like this as well
  const parsedPath = React.useMemo(() => parse(path), [path]);
  const pointWidth = React.useMemo(
    () => width / dataLength,
    [dataLength, width]
  );

  const atXPosition = useMemo(
    () => (at == null ? undefined : pointWidth * at),
    [at, pointWidth]
  );
  const atYPosition = useDerivedValue(() => {
    return atXPosition == null
      ? undefined
      : getYForX(parsedPath, atXPosition) ?? 0;
  }, [atXPosition]);

  const animatedCursorStyle = useAnimatedStyle(() => {
    let translateXOffset = elementWidth.value / 2;
    const isStatic = atYPosition.value != null;

    const x = atXPosition ?? currentX.value;
    if (x < elementWidth.value / 2 + xGutter) {
      const xOffset = elementWidth.value / 2 + xGutter - x;
      translateXOffset = translateXOffset - xOffset;
    }
    if (x > width - elementWidth.value / 2 - xGutter) {
      const xOffset = x - (width - elementWidth.value / 2 - xGutter);
      translateXOffset = translateXOffset + xOffset;
    }

    let translateYOffset = 0;
    const y = atYPosition.value ?? currentY.value;

    if (position === 'top') {
      translateYOffset = elementHeight.value / 2 + cursorGutter;
      if (y - translateYOffset < yGutter) {
        translateYOffset = y - yGutter;
      }
    } else if (position === 'bottom') {
      translateYOffset = -(elementHeight.value / 2) - cursorGutter / 2;
      if (y - translateYOffset + elementHeight.value > height - yGutter) {
        translateYOffset = y - (height - yGutter) + elementHeight.value;
      }
    }

    let translateY: number | undefined;
    if (type === 'crosshair' || isStatic) {
      translateY = y - translateYOffset;
    } else {
      if (position === 'top') {
        translateY = yGutter;
      } else {
        translateY = height - elementHeight.value - yGutter;
      }
    }

    return {
      transform: [
        { translateX: x - translateXOffset },
        {
          translateY: translateY,
        },
      ],
      // XOR, either its active or its static. When active fade out static ones
      opacity: isActive.value !== isStatic ? 1 : 0,
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
      {children || (
        <LineChartPriceText index={at} style={[textStyle]} {...textProps} />
      )}
    </Animated.View>
  );
}
