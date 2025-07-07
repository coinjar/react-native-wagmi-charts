import * as React from 'react';

import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import { LineChartPriceText, LineChartPriceTextProps } from './PriceText';

import { CursorContext } from './Cursor';
import { LineChartDimensionsContext } from './Chart';
import type { LayoutChangeEvent, ViewProps } from 'react-native';
import { getXPositionForCurve } from './utils/getXPositionForCurve';
import { getYForX } from 'react-native-redash';
import { useLineChart } from './useLineChart';
import { useMemo } from 'react';
import type { TFormatterFn } from '../candle/types';

export type LineChartTooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export type LineChartTooltipProps = Animated.AnimateProps<ViewProps> & {
  children?: React.ReactNode;
  format?: TFormatterFn<string>;
  xGutter?: number;
  yGutter?: number;
  cursorGutter?: number;
  position?: LineChartTooltipPosition;
  withHorizontalFloating?: boolean;
  textProps?: LineChartPriceTextProps;
  textStyle?: LineChartPriceTextProps['style'];
  /**
   * When specified the tooltip is considered static, and will
   * always be rendered at the given index, unless there is interaction
   * with the chart (like interacting with a cursor).
   *
   * @default undefined
   */
  at?: number;
};

LineChartTooltip.displayName = 'LineChartTooltip';

export function LineChartTooltip({
  children,
  format,
  xGutter = 8,
  yGutter = 8,
  cursorGutter = 48,
  position = 'top',
  withHorizontalFloating = false,
  textProps,
  textStyle,
  at,
  ...props
}: LineChartTooltipProps) {
  const { width, height, parsedPath } = React.useContext(
    LineChartDimensionsContext
  );
  const { type } = React.useContext(CursorContext);
  const { currentX, currentY, isActive } = useLineChart();

  const elementWidth = useSharedValue(0);
  const elementHeight = useSharedValue(0);

  const handleLayout = React.useCallback(
    (event: LayoutChangeEvent) => {
      elementWidth.value = event.nativeEvent.layout.width;
      elementHeight.value = event.nativeEvent.layout.height;
    },
    [elementHeight, elementWidth]
  );

  // When the user set a `at` index, get the index's y & x positions
  const atXPosition = useMemo(
    () =>
      at !== null && at !== undefined
        ? getXPositionForCurve(parsedPath, at)
        : undefined,
    [at, parsedPath]
  );

  const atYPosition = useDerivedValue(() => {
    return atXPosition == null
      ? undefined
      : getYForX(parsedPath, atXPosition) ?? 0;
  }, [atXPosition]);

  const getInitialTranslateXOffset = React.useCallback(
    (elementWidth: number) => {
      'worklet';
      if (position === 'right') return elementWidth + cursorGutter;
      if (position === 'left') return -cursorGutter;
      return elementWidth / 2;
    },
    [cursorGutter, position]
  );

  const animatedCursorStyle = useAnimatedStyle(() => {
    // the tooltip is considered static when the user specified an `at` prop
    const isStatic = atYPosition.value != null;

    // Calculate X position:
    let translateXOffset = getInitialTranslateXOffset(elementWidth.value);
    const x = atXPosition ?? currentX.value;
    const elementFullWidth = elementWidth.value + xGutter + cursorGutter;

    if (position === 'right') {
      if (x < elementFullWidth) {
        if (withHorizontalFloating) {
          translateXOffset = -cursorGutter;
        } else {
          translateXOffset = translateXOffset - elementFullWidth + x;
        }
      }
    } else if (position === 'left') {
      if (x > width - elementFullWidth) {
        if (withHorizontalFloating) {
          translateXOffset = elementWidth.value + cursorGutter;
        } else {
          const xOffset = x - (width - elementFullWidth);
          translateXOffset = translateXOffset + xOffset;
        }
      }
    } else {
      if (x < elementWidth.value / 2 + xGutter) {
        const xOffset = elementWidth.value / 2 + xGutter - x;
        translateXOffset = translateXOffset - xOffset;
      }
      if (x > width - elementWidth.value / 2 - xGutter) {
        const xOffset = x - (width - elementWidth.value / 2 - xGutter);
        translateXOffset = translateXOffset + xOffset;
      }
    }

    const translateX = x - translateXOffset;

    // Calculate Y position:
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
    } else if (position === 'right' || position === 'left') {
      translateYOffset = elementHeight.value / 2;
    }

    // determine final translateY value
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

    let opacity = isActive.value ? 1 : 0;
    if (isStatic) {
      // Only show static when there is no active cursor
      opacity = withTiming(isActive.value ? 0 : 1);
    }

    return {
      transform: [{ translateX }, { translateY }],
      opacity: opacity,
    };
  }, [
    atXPosition,
    atYPosition.value,
    currentX.value,
    currentY.value,
    cursorGutter,
    elementHeight.value,
    elementWidth.value,
    height,
    isActive.value,
    position,
    type,
    width,
    xGutter,
    yGutter,
  ]);

  return (
    <Animated.View
      onLayout={handleLayout}
      {...props}
      style={[
        styles.tooltip,
        animatedCursorStyle,
        props.style,
      ]}
    >
      {children || (
        <LineChartPriceText
          format={format}
          index={at}
          style={[textStyle]}
          {...textProps}
        />
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  tooltip: {
    position: 'absolute',
    padding: 4,
    alignSelf: 'flex-start',
  },
});
