import React, { useState } from 'react';
import { Text } from 'react-native';
import type {
  TextProps as RNTextProps,
  StyleProp,
  TextStyle,
} from 'react-native';
import type { AnimatedProps } from 'react-native-reanimated';
import {
  useDerivedValue,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';
import { useLineChartPrice } from './usePrice';
import { useLineChart } from './useLineChart';
import type { TFormatterFn } from '../../types';
import { AnimatedText } from '../../components/AnimatedText';

export type LineChartPriceTextProps = {
  format?: TFormatterFn<string>;
  precision?: number;
  variant?: 'formatted' | 'value';
  style?: AnimatedProps<RNTextProps>['style'];
  /**
   * By default, it will use the current active index from the chart.
   * If this is set it will use the index provided.
   */
  index?: number;
  /**
   * Use optimized rendering for high-frequency updates (bypasses AnimatedText)
   */
  useOptimizedRendering?: boolean;
  /**
   * Function to determine text color based on the formatted value
   */
  getTextColor?: (formattedValue: string) => string;
};

type OptimizedPriceTextProps = Omit<
  LineChartPriceTextProps,
  'format' | 'variant' | 'useOptimizedRendering'
> & {
  format: TFormatterFn<string>;
};

function OptimizedPriceText({
  format,
  precision = 2,
  style,
  index,
  getTextColor,
}: OptimizedPriceTextProps) {
  const { currentIndex, data } = useLineChart();
  const [displayText, setDisplayText] = useState('');

  const textValue = useDerivedValue(() => {
    if (!data) {
      return '';
    }
    if (
      (typeof currentIndex.value === 'undefined' ||
        currentIndex.value === -1) &&
      index == null
    ) {
      return '';
    }
    const price =
      data[Math.min(index ?? currentIndex.value, data.length - 1)]!.value;
    const valueString = price.toFixed(precision).toString();

    // Call format function directly in worklet
    return format({ value: valueString, formatted: valueString });
  }, [currentIndex, data, precision, index, format]);

  // Use useAnimatedReaction to update React state with runOnJS
  useAnimatedReaction(
    () => textValue.value,
    (current, previous) => {
      if (current !== previous) {
        runOnJS(setDisplayText)(current);
      }
    },
    [textValue]
  );

  // Only take over the color when a getTextColor function is supplied,
  // otherwise any color coming from `style` would be overridden.
  const textColor = displayText ? getTextColor?.(displayText) : undefined;
  const dynamicStyle = (
    textColor == null ? style : [style, { color: textColor }]
  ) as StyleProp<TextStyle>;

  return <Text style={dynamicStyle}>{displayText}</Text>;
}

type DefaultPriceTextProps = Omit<
  LineChartPriceTextProps,
  'useOptimizedRendering' | 'getTextColor'
>;

function DefaultPriceText({
  format,
  precision = 2,
  variant = 'formatted',
  style,
  index,
}: DefaultPriceTextProps) {
  const price = useLineChartPrice({ format, precision, index });
  return <AnimatedText text={price[variant]} style={style} />;
}

/**
 * Purely a dispatcher — if we have a custom format function and optimized
 * rendering is enabled, use regular React state instead of AnimatedText
 */
export function LineChartPriceText({
  format,
  precision,
  variant,
  style,
  index,
  useOptimizedRendering = false,
  getTextColor,
}: LineChartPriceTextProps) {
  if (format && useOptimizedRendering) {
    return (
      <OptimizedPriceText
        format={format}
        precision={precision}
        style={style}
        index={index}
        getTextColor={getTextColor}
      />
    );
  }

  return (
    <DefaultPriceText
      format={format}
      precision={precision}
      variant={variant}
      style={style}
      index={index}
    />
  );
}

LineChartPriceText.displayName = 'LineChartPriceText';
