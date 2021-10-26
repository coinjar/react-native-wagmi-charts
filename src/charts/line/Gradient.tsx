import * as React from 'react';
import Animated, {
  useAnimatedProps,
  useAnimatedReaction,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Defs, LinearGradient, Stop, Path, PathProps } from 'react-native-svg';

import { LineChartDimensionsContext } from './Chart';
import { LineChartPathContext } from './ChartPath';
import interpolatePath from './interpolatePath';
import { usePrevious } from '../../utils';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export type LineChartGradientProps = Animated.AnimateProps<PathProps> & {
  color?: string;
  children?: React.ReactNode;
};

let id = 0;

export function LineChartGradient({
  color: overrideColor = undefined,
  children,
  ...props
}: LineChartGradientProps) {
  const { area } = React.useContext(LineChartDimensionsContext);
  const { color: contextColor, isTransitionEnabled } =
    React.useContext(LineChartPathContext);

  const color = overrideColor || contextColor;

  ////////////////////////////////////////////////

  const transition = useSharedValue(0);

  const previousPath = usePrevious(area);

  useAnimatedReaction(
    () => {
      return area;
    },
    (_, previous) => {
      if (previous) {
        transition.value = 0;
        transition.value = withTiming(1);
      }
    },
    [area]
  );

  const animatedProps = useAnimatedProps(() => {
    let d = area || '';
    if (previousPath && isTransitionEnabled) {
      const pathInterpolator = interpolatePath(previousPath, area, null);
      d = pathInterpolator(transition.value);
    }
    return {
      d,
    };
  });

  ////////////////////////////////////////////////

  const localId = React.useRef(++id);

  ////////////////////////////////////////////////

  return (
    <>
      {children ? (
        <Defs>
          <LinearGradient
            id={`${localId.current}`}
            x1="0"
            x2="0"
            y1="0"
            y2="100%"
          >
            {children}
          </LinearGradient>
        </Defs>
      ) : (
        <Defs>
          <LinearGradient
            id={`${localId.current}`}
            x1="0"
            x2="0"
            y1="0"
            y2="100%"
          >
            <Stop offset="20%" stopColor={color} stopOpacity={0.15} />
            <Stop offset="40%" stopColor={color} stopOpacity={0.05} />
            <Stop offset="100%" stopColor={color} stopOpacity={0} />
          </LinearGradient>
        </Defs>
      )}
      <AnimatedPath
        animatedProps={animatedProps}
        fill={`url(#${localId.current})`}
        {...props}
      />
    </>
  );
}
