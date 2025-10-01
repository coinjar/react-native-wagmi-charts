// forked from https://github.com/wcandillon/react-native-redash/blob/master/src/ReText.tsx

import React from 'react';
import { Platform, StyleSheet, TextProps as RNTextProps } from 'react-native';
import { TextInput } from 'react-native';
import Animated, {
  useAnimatedProps,
  useAnimatedReaction,
} from 'react-native-reanimated';
import type { SharedValue, AnimatedProps } from 'react-native-reanimated';
Animated.addWhitelistedNativeProps({ text: true });

interface AnimatedTextProps {
  text: SharedValue<string>;
  style?: AnimatedProps<RNTextProps>['style'];
}

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export const AnimatedText = ({ text, style }: AnimatedTextProps) => {
  const inputRef = React.useRef<TextInput>(null);

  useAnimatedReaction(
    () => text.value,
    (data, prevData) => {
      // Only execute for web platform
      if (Platform.OS === 'web' && data !== prevData && inputRef.current) {
        // @ts-expect-error - web TextInput has value property
        inputRef.current.value = data;
      }
    },
    [text]
  );

  const animatedProps = useAnimatedProps(() => {
    return {
      text: text.value,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
  });

  return (
    <AnimatedTextInput
      underlineColorAndroid="transparent"
      editable={false}
      ref={Platform.select({ web: inputRef })}
      style={[styles.text, style]}
      animatedProps={animatedProps}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
});
