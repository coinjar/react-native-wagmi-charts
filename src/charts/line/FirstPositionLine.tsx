import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Line as SVGLine, LineProps } from 'react-native-svg';
import { getYForX, parse } from 'react-native-redash';

import { LineChartDimensionsContext } from './Chart';

type FirstPositionLineProps = {
  color?: string;
  lineProps?: Partial<LineProps>;
};

export const LineChartFirstPositionLine = ({
  color = 'gray',
  lineProps = {},
}: FirstPositionLineProps) => {
  const { width, path } = React.useContext(LineChartDimensionsContext);

  const parsedPath = React.useMemo(() => parse(path), [path]);

  const vertical = useAnimatedStyle(() => ({
    height: 1,
    width: '100%',
    transform: [{ translateY: withTiming(getYForX(parsedPath!, 0) || 10) }],
  }));

  return (
    <Animated.View style={vertical}>
      <Svg style={styles.svg}>
        <SVGLine
          x1={0}
          y1={0}
          x2={width}
          y2={0}
          strokeWidth={2}
          stroke={color}
          strokeDasharray="3 3"
          {...lineProps}
        />
      </Svg>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  svg: {
    ...StyleSheet.absoluteFillObject,
    // height: 100% is required for <svg /> on web
    height: '100%',
  },
});
