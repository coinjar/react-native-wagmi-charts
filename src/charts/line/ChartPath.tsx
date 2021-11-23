import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Svg } from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  withTiming,
} from 'react-native-reanimated';
import flattenChildren from 'react-keyed-flatten-children';

import { LineChartDimensionsContext } from './Chart';
import { LineChartPath, LineChartPathProps } from './Path';
import { useLineChart } from './useLineChart';

const BACKGROUND_COMPONENTS = [
  'LineChartHighlight',
  'LineChartHorizontalLine',
  'LineChartGradient',
  'LineChartDot',
];
const FOREGROUND_COMPONENTS = ['LineChartHighlight', 'LineChartDot'];

const AnimatedSVG = Animated.createAnimatedComponent(Svg);

export const LineChartPathContext = React.createContext({
  color: '',
  isInactive: false,
  isTransitionEnabled: true,
});

type LineChartPathWrapperProps = {
  animationDuration?: number;
  animationProps?: Partial<Animated.WithTimingConfig>;
  children?: React.ReactNode;
  color?: string;
  inactiveColor?: string;
  width?: number;
  widthOffset?: number;
  pathProps?: Partial<LineChartPathProps>;
  showInactivePath?: boolean;
};

LineChartPathWrapper.displayName = 'LineChartPathWrapper';

export function LineChartPathWrapper({
  animationDuration = 300,
  animationProps = {},
  children,
  color = 'black',
  inactiveColor,
  width: strokeWidth = 3,
  widthOffset = 20,
  pathProps = {},
  showInactivePath = true,
}: LineChartPathWrapperProps) {
  const { height, pathWidth, width } = React.useContext(
    LineChartDimensionsContext
  );
  const { currentX, isActive } = useLineChart();

  ////////////////////////////////////////////////

  const svgProps = useAnimatedProps(() => ({
    width: isActive.value
      ? // on Web, <svg /> elements don't support negative widths
        // https://github.com/coinjar/react-native-wagmi-charts/issues/24#issuecomment-955789904
        Math.max(currentX.value, 0)
      : withTiming(
          pathWidth + widthOffset,
          Object.assign({ duration: animationDuration }, animationProps)
        ),
  }));

  const viewSize = React.useMemo(() => ({ width, height }), [width, height]);

  ////////////////////////////////////////////////

  let backgroundChildren;
  let foregroundChildren;
  if (children) {
    const iterableChildren = flattenChildren(children);
    backgroundChildren = iterableChildren.filter((child) =>
      // @ts-ignore
      BACKGROUND_COMPONENTS.includes(child?.type?.displayName)
    );
    foregroundChildren = iterableChildren.filter((child) =>
      // @ts-ignore
      FOREGROUND_COMPONENTS.includes(child?.type?.displayName)
    );
  }

  ////////////////////////////////////////////////

  return (
    <>
      <LineChartPathContext.Provider
        value={{
          color,
          isInactive: showInactivePath,
          isTransitionEnabled: pathProps.isTransitionEnabled ?? true,
        }}
      >
        <View style={viewSize}>
          <Svg width={width} height={height}>
            <LineChartPath
              color={color}
              inactiveColor={inactiveColor}
              width={strokeWidth}
              {...pathProps}
            />
            {backgroundChildren}
          </Svg>
        </View>
      </LineChartPathContext.Provider>
      <LineChartPathContext.Provider
        value={{
          color,
          isInactive: false,
          isTransitionEnabled: pathProps.isTransitionEnabled ?? true,
        }}
      >
        <View style={StyleSheet.absoluteFill}>
          <AnimatedSVG animatedProps={svgProps} height={height}>
            <LineChartPath color={color} width={strokeWidth} {...pathProps} />
            {foregroundChildren}
          </AnimatedSVG>
        </View>
      </LineChartPathContext.Provider>
    </>
  );
}
