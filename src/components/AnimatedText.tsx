// forked from https://github.com/wcandillon/react-native-redash/blob/master/src/ReText.tsx

import React from 'react';
import type { TextProps as RNTextProps } from 'react-native';
import { Platform, StyleSheet } from 'react-native';
import { TextInput } from 'react-native';
import Animated, {
  useAnimatedProps,
  useAnimatedReaction,
  useDerivedValue,
} from 'react-native-reanimated';
import type { SharedValue, AnimatedProps } from 'react-native-reanimated';
Animated.addWhitelistedNativeProps({ text: true });

interface AnimatedTextProps {
  text: SharedValue<string>;
  style?: AnimatedProps<RNTextProps>['style'];
}

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

// Android measures an empty TextInput differently from one containing text.
// A zero-width glyph keeps its baseline stable without displaying fallback text.
const ANDROID_EMPTY_TEXT_PLACEHOLDER = '\u200B';

const isAndroid = Platform.OS === 'android';

export const AnimatedText = ({ text, style }: AnimatedTextProps) => {
  const inputRef = React.useRef<TextInput>(null);

  const displayText = useDerivedValue<string | undefined>(() =>
    isAndroid && text.value === '' ? ANDROID_EMPTY_TEXT_PLACEHOLDER : text.value
  );

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
      text: displayText.value,
    };
  });

  return (
    <AnimatedTextInput
      underlineColorAndroid="transparent"
      editable={false}
      defaultValue={displayText}
      ref={Platform.select({ web: inputRef })}
      style={[styles.text, style]}
      animatedProps={
        animatedProps as React.ComponentProps<
          typeof AnimatedTextInput
        >['animatedProps']
      }
    />
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
});
