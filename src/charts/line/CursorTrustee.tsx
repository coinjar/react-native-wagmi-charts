import * as React from 'react';
import { Platform, View, ViewProps, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring
} from 'react-native-reanimated';
import Svg, { Line as SVGLine, LineProps } from 'react-native-svg';

import { LineChartCursor, LineChartCursorProps } from './Cursor';
import { LineChartDimensionsContext } from './Chart';
import { useLineChart } from './useLineChart';

type LineChartCursorTrusteeProps = Omit<
  LineChartCursorProps,
  'children' | 'type'
> & {
  children?: React.ReactNode;
  color?: string;
  size?: number;
  outerSize?: number;
  crosshairWrapperProps?: Animated.AnimateProps<ViewProps>;
  crosshairProps?: ViewProps;
  crosshairOuterProps?: ViewProps;
  lineVerticalProps?: Partial<LineProps>;
  lineHorizontalProps?: Partial<LineProps>;
};

LineChartCursorTrustee.displayName = 'LineChartCursorTrustee';

const AnimatedSvgLine = Animated.createAnimatedComponent(SVGLine)

export function LineChartCursorTrustee({
  children,
  color = 'black',
  horizontalLineColor = 'green',
  verticalLineColor = 'orange',
  size = 8,
  outerSize = 32,
  crosshairWrapperProps = {},
  crosshairProps = {},
  crosshairOuterProps = {},
  lineVerticalProps = {},
  lineHorizontalProps = {},
  ...props
}: LineChartCursorTrusteeProps) {
  const { height, width } = React.useContext(LineChartDimensionsContext);
  const { currentX, currentY, isActive } = useLineChart();

  // It seems that enabling spring animation on initial render on Android causes a crash.
  const [enableSpringAnimation, setEnableSpringAnimation] = React.useState(
    Platform.OS === 'ios'
  );
  React.useEffect(() => {
    setTimeout(() => {
      setEnableSpringAnimation(true);
    }, 100);
  }, []);

  const animatedCursorStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: currentX.value - outerSize / 2 },
      { translateY: currentY.value - outerSize / 2 },
      {
        scale: enableSpringAnimation
          ? withSpring(isActive.value ? 1 : 0, {
              damping: 10,
            })
          : 0,
      },
    ],
  }));

  const horizontal = useAnimatedStyle(() => ({
    opacity: isActive.value ? 1 : 0,
    transform: [{ translateY: currentY.value }],
  }));

  const vertical = useAnimatedStyle(() => ({
    opacity: isActive.value ? 1 : 0,
    transform: [{ translateX: currentX.value }],
  }));

  const vertical2 = useAnimatedStyle(() => ({
      y1: currentY.value || 0
  }));

  return (
    <LineChartCursor type='trustee' {...props}>
      <Animated.View
        {...crosshairWrapperProps}
        style={[
          {
            width: outerSize,
            height: outerSize,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 5
          },
          animatedCursorStyle,
          crosshairWrapperProps.style,
        ]}
      >
        <View
          {...crosshairOuterProps}
          style={[
            {
              backgroundColor: color,
              width: outerSize,
              height: outerSize,
              borderRadius: outerSize,
              opacity: 0.1,
              position: 'absolute',
            },
            crosshairOuterProps.style,
          ]}
        />
        <View
          {...crosshairProps}
          style={[
            {
              backgroundColor: color,
              width: size,
              height: size,
              borderRadius: size,
            },
            crosshairProps.style,
          ]}
        />
      </Animated.View>
      <Animated.View style={[horizontal, { ...StyleSheet.absoluteFillObject, width: width }]}>
          <Svg>
            <SVGLine 
              x1={0}
              y1={0}
              x2={width}
              y2={0}
              strokeWidth={2}
              stroke={horizontalLineColor}
              {...lineHorizontalProps}
            />
          </Svg>
      </Animated.View>
      <Animated.View style={[vertical, { ...StyleSheet.absoluteFillObject  }]}>
        <Svg>
          <AnimatedSvgLine
            x1={0}
            y1={0}
            x2={0}
            y2={height}
            strokeWidth={2}
            stroke={verticalLineColor}
            animatedProps={vertical2}
            {...lineVerticalProps}
          />
        </Svg>
      </Animated.View>
      {children}
    </LineChartCursor>
  );
}
