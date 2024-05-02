import * as React from 'react';
import Animated from 'react-native-reanimated';
import { ClipPath, Defs, G, Path, PathProps, Rect } from 'react-native-svg';

import { LineChartDimensionsContext } from './Chart';
import { LineChartPathContext } from './LineChartPathContext';
import useAnimatedPath from './useAnimatedPath';
import { getXPositionForCurve } from './utils/getXPositionForCurve';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export type LineChartColorProps = Animated.AnimateProps<PathProps> & {
  color?: string;
  from: number;
  to: number;
  showInactiveColor?: boolean;
  inactiveColor?: string;
  width?: number;
};

LineChartHighlight.displayName = 'LineChartHighlight';

export function LineChartHighlight({
  color = 'black',
  inactiveColor,
  showInactiveColor = true,
  from,
  to,
  width: strokeWidth = 3,
  ...props
}: LineChartColorProps) {
  const { path, parsedPath, height } = React.useContext(
    LineChartDimensionsContext
  );
  const { isTransitionEnabled, isInactive: _isInactive } =
    React.useContext(LineChartPathContext);
  const isInactive = showInactiveColor && _isInactive;

  ////////////////////////////////////////////////

  const { animatedProps } = useAnimatedPath({
    enabled: isTransitionEnabled,
    path,
  });

  ////////////////////////////////////////////////

  const clipStart = getXPositionForCurve(parsedPath, from);
  const clipEnd = getXPositionForCurve(parsedPath, to);

  return (
    <G>
      <Defs>
        <ClipPath id="clip">
          <Rect
            x={clipStart}
            y="0"
            width={clipEnd - clipStart}
            height={height}
            fill="white"
          />
        </ClipPath>
      </Defs>
      <AnimatedPath
        clipPath="url(#clip)"
        animatedProps={animatedProps}
        fill="transparent"
        stroke={isInactive ? inactiveColor || color : color}
        strokeWidth={strokeWidth}
        strokeOpacity={isInactive && !inactiveColor ? 0.5 : 1}
        {...props}
      />
    </G>
  );
}
