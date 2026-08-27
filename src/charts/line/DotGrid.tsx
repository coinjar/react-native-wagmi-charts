import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import type { AnimatedProps } from 'react-native-reanimated';
import {
  Circle,
  Defs,
  LinearGradient,
  Path,
  Pattern,
  Stop,
  Svg,
} from 'react-native-svg';
import type { PathProps } from 'react-native-svg';

import { LineChartDimensionsContext } from './Chart';
import { LineChartPathContext } from './LineChartPathContext';
import { useAnimatedPath } from './useAnimatedPath';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export type LineChartDotGridProps = AnimatedProps<PathProps> & {
  color?: string;
  /**
   * Distance in pixels between the centers of two neighbouring dots, both down
   * a column and across to the next column
   */
  spacing?: number;
  /** Radius in pixels of each dot */
  radius?: number;
  /**
   * `<Stop>` elements describing how the dots are painted from top to bottom.
   * Works exactly the same as in `LineChart.Gradient`.
   */
  children?: React.ReactNode;
};

let id = 0;

LineChartDotGrid.displayName = 'LineChartDotGrid';

export function LineChartDotGrid({
  color: overrideColor = undefined,
  spacing = 5,
  radius = 1.5,
  children,
  ...props
}: LineChartDotGridProps) {
  const { area, width, height, chartDrawingHeight } = React.useContext(
    LineChartDimensionsContext
  );
  const { color: contextColor, isTransitionEnabled } =
    React.useContext(LineChartPathContext);
  const color = overrideColor || contextColor;
  const hasValidDimensions =
    Number.isFinite(spacing) && spacing > 0 && chartDrawingHeight > 0;

  const localId = React.useRef(++id);
  const patternId = `wagmi-dot-grid-${localId.current}`;
  const gradientId = `wagmi-dot-grid-gradient-${localId.current}`;

  // One tile of the lattice: a single column of dots, as tall as the drawing
  // area. The gradient does the painting, so this is pure geometry.
  const dots = React.useMemo(() => {
    if (!hasValidDimensions) {
      return null;
    }

    const rows = Math.floor(chartDrawingHeight / spacing);
    if (rows < 1) {
      return null;
    }

    const originY = (chartDrawingHeight - (rows - 1) * spacing) / 2;

    const result: React.ReactElement[] = [];
    for (let i = 0; i < rows; i++) {
      result.push(
        <Circle
          key={i}
          cx={spacing / 2}
          cy={originY + i * spacing}
          r={radius}
          fill={`url(#${gradientId})`}
        />
      );
    }
    return result;
  }, [chartDrawingHeight, gradientId, hasValidDimensions, radius, spacing]);

  // The grid is static; animating the same area path `LineChart.Gradient` fills
  // makes it read as a hole cut out by the line, frame by frame.  Filling
  // rather than clipping keeps that to one path per frame, which matters
  // because react-native-svg re-rasterizes the canvas on the CPU.
  //
  // <ClipPath> is also broken here: an animated path inside one never
  // invalidates the group's cached geometry on Android, freezing the cutout on
  // the first dataset.
  const { animatedProps } = useAnimatedPath({
    enabled: isTransitionEnabled,
    path: area,
  });

  if (!hasValidDimensions) {
    return null;
  }

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Svg width={width} height={height}>
        <Defs>
          {/*
            `userSpaceOnUse` is what makes the ramp span the chart. Left to the
            default the gradient would map onto each dot's own bounding box.
          */}
          <LinearGradient
            id={gradientId}
            gradientUnits="userSpaceOnUse"
            x1={0}
            y1={0}
            x2={0}
            y2={chartDrawingHeight}
          >
            {children
              ? (children as React.ReactElement[])
              : [
                  <Stop
                    key="from"
                    offset="0%"
                    stopColor={color}
                    stopOpacity={1}
                  />,
                  <Stop
                    key="to"
                    offset="100%"
                    stopColor={color}
                    stopOpacity={0}
                  />,
                ]}
          </LinearGradient>
          <Pattern
            id={patternId}
            patternUnits="userSpaceOnUse"
            x={0}
            y={0}
            width={spacing}
            height={chartDrawingHeight}
          >
            {dots}
          </Pattern>
        </Defs>
        <AnimatedPath
          animatedProps={animatedProps}
          fill={`url(#${patternId})`}
          {...props}
        />
      </Svg>
    </View>
  );
}
