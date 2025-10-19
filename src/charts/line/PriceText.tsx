import React, { useState } from 'react';
import { Text, TextStyle } from 'react-native';
import type { TextProps as RNTextProps, StyleProp } from 'react-native';
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

LineChartPriceText.displayName = 'LineChartPriceText';

export function LineChartPriceText({
  format,
  precision = 2,
  variant = 'formatted',
  style,
  index,
  useOptimizedRendering = false,
  getTextColor,
}: LineChartPriceTextProps) {
  const price = useLineChartPrice({ format, precision, index });

  // If we have a custom format function and optimized rendering is enabled,
  // use regular React state instead of AnimatedText
  if (format && useOptimizedRendering) {
    const { currentIndex, data } = useLineChart();
    const [displayText, setDisplayText] = useState('');
    const [textColor, setTextColor] = useState('#000000');

    const updateText = (newText: string) => {
      setDisplayText(newText);
      // Update color if getTextColor function is provided
      if (getTextColor) {
        setTextColor(getTextColor(newText));
      }
    };

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
      let price = 0;
      price =
        data[Math.min(index ?? currentIndex.value, data.length - 1)]!.value;
      const valueString = price.toFixed(precision).toString();

      // Call format function directly in worklet
      return format({ value: valueString, formatted: valueString });
    }, [currentIndex, data, precision]);

    // Use useAnimatedReaction to update React state with runOnJS
    useAnimatedReaction(
      () => textValue.value,
      (current, previous) => {
        if (current !== previous) {
          runOnJS(updateText)(current);
        }
      },
      [textValue]
    );

    // Merge the text color with the provided style
    const dynamicStyle = [style, { color: textColor }] as StyleProp<TextStyle>;

    return <Text style={dynamicStyle}>{displayText}</Text>;
  }

  // For non-custom format, use the original approach
  return <AnimatedText text={price[variant]} style={style} />;
}
