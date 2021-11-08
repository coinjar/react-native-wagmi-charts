// forked from https://github.com/wcandillon/react-native-redash/blob/master/src/ReText.tsx

import React from 'react';
import { Platform, TextProps as RNTextProps } from 'react-native';
import { TextInput } from 'react-native';
import Animated, {
  useAnimatedProps,
  useAnimatedReaction,
} from 'react-native-reanimated';

Animated.addWhitelistedNativeProps({ text: true });

interface AnimatedTextProps {
  text: Animated.SharedValue<string>;
  style?: Animated.AnimateProps<RNTextProps>['style'];
}

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export const AnimatedText = ({ text, style }: AnimatedTextProps) => {
  const inputRef = React.useRef<TextInput>(null);

  useAnimatedReaction(
    () => {
      // always return false unless web to prevent unnecessary reactions
      return Platform.OS === 'web' && text.value;
    },
    (data, prevData) => {
      if (Platform.OS === 'web' && data !== prevData && inputRef.current) {
        inputRef.current.setNativeProps({
          value: data,
          style
        });
      }
    }
  );
  const animatedProps = useAnimatedProps(() => {
    return {
      text: text.value,
      // Here we use any because the text prop is not available in the type
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
  });
  return (
    <AnimatedTextInput
      underlineColorAndroid="transparent"
      editable={false}
      ref={Platform.select({ web: inputRef })}
      value={text.value}
      style={style}
      animatedProps={animatedProps}
    />
  );
};
