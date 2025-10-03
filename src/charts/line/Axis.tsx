import React from 'react';
import {
  ViewProps,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { Line, Svg } from 'react-native-svg';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { LineChartDimensionsContext } from './Chart';
import { useLineChart } from './useLineChart';

export type LineChartAxisPosition = 'left' | 'right' | 'top' | 'bottom';
export type LineChartAxisOrientation = 'horizontal' | 'vertical';

export type LineChartAxisProps = ViewProps & {
  position: LineChartAxisPosition;
  orientation: LineChartAxisOrientation;
  color?: string;
  strokeWidth?: number;
  tickCount?: number;
  domain?: [number, number];
  hideOnInteraction?: boolean;
  format?: (value: number | string) => string | number;
  textStyle?: TextStyle;
  labelPadding?: number; // Padding to prevent labels from going off-screen
  labelWidth?: number; // Width allocated for labels
  containerStyle?: ViewStyle; // Custom container style
};

export const LineChartAxis = ({
  position,
  orientation,
  color = '#666',
  strokeWidth,
  tickCount = 5,
  domain = [0, 100],
  hideOnInteraction = false,
  format = (value) => value,
  textStyle,
  labelPadding = 3,
  containerStyle,
  ...props
}: LineChartAxisProps) => {
  const { width, height } = React.useContext(LineChartDimensionsContext);
  const { isActive } = useLineChart();

  // Reserve space at the bottom for x-axis cursor labels
  const X_AXIS_LABEL_RESERVED_HEIGHT = 40;
  // For vertical axes, don't extend into the reserved cursor label space
  const effectiveHeight =
    orientation === 'vertical' ? height - X_AXIS_LABEL_RESERVED_HEIGHT : height;

  const padding = {
    left: 5,
    right: 5,
    top: 20,
    bottom: 20,
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: hideOnInteraction && isActive.value ? 0 : 1,
    };
  }, [hideOnInteraction, isActive]);

  const renderTicks = () => {
    const [min, max] = domain;
    const ticks = [];
    const labels = [];
    const tickLength = 5;
    const labelOffset = 8;

    // Calculate maximum label width needed dynamically
    let maxLabelWidth = 0;
    const fontSize = textStyle?.fontSize || 10;
    const charWidth = fontSize * 0.6; // Dynamic character width based on font size

    for (let i = 0; i <= tickCount; i++) {
      const value = min + (max - min) * (i / tickCount);
      const formattedValue = String(format(value));
      // Dynamic width calculation based on actual font size
      const estimatedWidth = formattedValue.length * charWidth;
      maxLabelWidth = Math.max(maxLabelWidth, estimatedWidth);
    }

    // Dynamic width allocation - ensure we don't exceed available space
    const maxAllowableWidth =
      position === 'left' || position === 'right'
        ? Math.max(width * 0.3, 60) // Allow up to 30% of chart width for y-axis labels, minimum 60px
        : width * 0.9; // For horizontal labels, use most of the width

    const dynamicLabelWidth = Math.min(
      Math.max(maxLabelWidth + 16, 40), // Minimum 40px, add 16px padding
      maxAllowableWidth // Don't exceed the calculated max
    );

    for (let i = 0; i <= tickCount; i++) {
      const value = min + (max - min) * (i / tickCount);
      const tickPosition = i / tickCount;

      if (orientation === 'vertical') {
        // Add padding to prevent labels from going off-screen
        const topPadding = labelPadding;
        const bottomPadding = labelPadding;

        // Calculate y position with padding to keep labels on screen
        const availableHeight = effectiveHeight - topPadding - bottomPadding;
        const y = topPadding + availableHeight * (1 - tickPosition);
        const x = position === 'left' ? padding.left : width - padding.right;

        if (strokeWidth) {
          ticks.push(
            <Line
              key={`tick-${i}`}
              x1={x}
              y1={y}
              x2={position === 'left' ? x - tickLength : x + tickLength}
              y2={y}
              stroke={color}
              strokeWidth={strokeWidth}
            />
          );
        }

        labels.push(
          <Animated.View
            key={`label-${i}`}
            style={[
              styles.verticalLabel,
              {
                width: dynamicLabelWidth, // Use calculated width
                left:
                  position === 'left'
                    ? Math.max(0, x - labelOffset - dynamicLabelWidth) // Keep labels within left boundary
                    : Math.min(width - dynamicLabelWidth - 5, x + labelOffset), // Keep labels within right boundary with 5px margin
                top: y - 10, // Center the label vertically on the tick mark
              },
              position === 'left' ? styles.alignEnd : styles.alignStart,
            ]}
          >
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                styles.labelText,
                { color: color },
                position === 'left' ? styles.textRight : styles.textLeft,
                textStyle,
              ]}
              adjustsFontSizeToFit={true}
              minimumFontScale={0.7}
            >
              {String(format(value))}
            </Text>
          </Animated.View>
        );
      } else {
        const x = width * tickPosition;
        const y = position === 'top' ? 15 : height - padding.bottom;

        if (strokeWidth) {
          ticks.push(
            <Line
              key={`tick-${i}`}
              x1={x}
              y1={y}
              x2={x}
              y2={position === 'top' ? y - tickLength : height - 15}
              stroke={color}
              strokeWidth={strokeWidth}
            />
          );
        }

        const alignmentStyle =
          i === 0
            ? styles.alignStart
            : i === tickCount
            ? styles.alignEnd
            : styles.alignCenter;
        const textAlignStyle =
          i === 0
            ? styles.textLeft
            : i === tickCount
            ? styles.textRight
            : styles.textCenter;

        labels.push(
          <Animated.View
            key={`label-${i}`}
            style={[
              styles.horizontalLabel,
              {
                width: dynamicLabelWidth, // Use dynamic width for horizontal labels too
                left: Math.max(
                  0,
                  Math.min(
                    width - dynamicLabelWidth,
                    i === 0
                      ? x + labelOffset
                      : i === tickCount
                      ? x - dynamicLabelWidth - labelOffset
                      : x - dynamicLabelWidth / 2
                  )
                ),
                top:
                  position === 'top'
                    ? Math.max(0, y - labelOffset - 15)
                    : Math.max(0, height - 35),
              },
              alignmentStyle,
            ]}
          >
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                styles.labelText,
                { color: color },
                textAlignStyle,
                textStyle,
              ]}
              adjustsFontSizeToFit={true}
              minimumFontScale={0.7}
            >
              {String(format(value))}
            </Text>
          </Animated.View>
        );
      }
    }

    return { ticks, labels };
  };

  const renderAxis = () => {
    const { ticks, labels } = renderTicks();

    let axisLine = null;

    if (strokeWidth) {
      switch (position) {
        case 'left':
          axisLine = (
            <Line
              x1={padding.left}
              y1={0}
              x2={padding.left}
              y2={effectiveHeight}
              stroke={color}
              strokeWidth={strokeWidth}
            />
          );
          break;
        case 'right':
          axisLine = (
            <Line
              x1={width - padding.right}
              y1={0}
              x2={width - padding.right}
              y2={effectiveHeight}
              stroke={color}
              strokeWidth={strokeWidth}
            />
          );
          break;
        case 'top':
          axisLine = (
            <Line
              x1={0}
              y1={20}
              x2={width}
              y2={20}
              stroke={color}
              strokeWidth={strokeWidth}
            />
          );
          break;
        case 'bottom':
          axisLine = (
            <Line
              x1={0}
              y1={height - 20}
              x2={width}
              y2={height - 20}
              stroke={color}
              strokeWidth={strokeWidth}
            />
          );
          break;
      }
    }

    return { axisLine, ticks, labels };
  };

  const { axisLine, ticks, labels } = renderAxis();

  return (
    <Animated.View
      style={[styles.container, containerStyle, props.style, animatedStyle]}
    >
      <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
        {axisLine}
        {ticks}
      </Svg>
      <Animated.View style={[StyleSheet.absoluteFill, styles.labelsContainer]}>
        {labels}
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  verticalLabel: {
    position: 'absolute',
    minHeight: 20,
    zIndex: 1000,
    overflow: 'visible',
    justifyContent: 'center',
  },
  horizontalLabel: {
    position: 'absolute',
    minHeight: 20,
    zIndex: 1000,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  labelText: {
    fontSize: 10,
  },
  labelsContainer: {
    zIndex: 1000,
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  alignCenter: {
    alignItems: 'center',
  },
  textLeft: {
    textAlign: 'left',
  },
  textRight: {
    textAlign: 'right',
  },
  textCenter: {
    textAlign: 'center',
  },
});
