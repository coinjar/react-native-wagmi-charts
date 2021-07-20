import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { ReText } from 'react-native-redash';

import { formatUSD, scaleYInvert } from './utils';

const styles = StyleSheet.create({
  container: {
    width: 100,
    alignSelf: 'flex-end',
    backgroundColor: '#FEFFFF',
    borderRadius: 4,
    padding: 4,
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

interface LabelProps {
  translateY: Animated.SharedValue<number>;
  domain: number[];
  maxHeight: number;
  opacity: Animated.SharedValue<number>;
}

const Label = ({ maxHeight, translateY, domain, opacity }: LabelProps) => {
  const text = useDerivedValue(() => {
    const price = scaleYInvert({
      y: translateY.value,
      domain,
      maxHeight,
    });
    return formatUSD(price);
  });

  const horizontal = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));
  return (
    <Animated.View style={[styles.container, horizontal]}>
      <ReText {...{ text }} />
    </Animated.View>
  );
};

export default Label;
