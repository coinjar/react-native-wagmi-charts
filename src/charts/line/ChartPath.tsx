import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Svg } from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  withTiming,
} from 'react-native-reanimated';

import { LineChartDimensionsContext } from './Chart';
import { LineChartPath, LineChartPathProps } from './Path';
import { useLineChart } from './useLineChart';

const BACKGROUND_COMPONENTS = [
  'LineChartColor',
  'LineChartHorizontalLine',
  'LineChartGradient',
  'LineChartDot',
];
const FOREGROUND_COMPONENTS = ['LineChartColor', 'LineChartDot'];

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
  width: pathWidth = 3,
  pathProps = {},
  showInactivePath = true,
}: LineChartPathWrapperProps) {
  const { width, height } = React.useContext(LineChartDimensionsContext);
  const { currentX, isActive } = useLineChart();

  ////////////////////////////////////////////////

  const svgProps = useAnimatedProps(() => ({
    width: isActive.value
      ? currentX.value
      : withTiming(
          width,
          Object.assign({ duration: animationDuration }, animationProps)
        ),
  }));

  ////////////////////////////////////////////////

  let backgroundChildren;
  let foregroundChildren;
  if (children) {
    const iterableChildren = Array.isArray(children) ? children : [children];
    backgroundChildren = iterableChildren.filter((child) =>
      // @ts-ignore
      BACKGROUND_COMPONENTS.includes(child?.type.displayName)
    );
    foregroundChildren = iterableChildren.filter((child) =>
      // @ts-ignore
      FOREGROUND_COMPONENTS.includes(child?.type.displayName)
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
        <View style={[{ width, height }]}>
          <Svg width={width} height={height}>
            <LineChartPath
              color={color}
              inactiveColor={inactiveColor}
              width={pathWidth}
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
            <LineChartPath color={color} width={pathWidth} {...pathProps} />
            {foregroundChildren}
          </AnimatedSVG>
        </View>
      </LineChartPathContext.Provider>
    </>
  );
}
