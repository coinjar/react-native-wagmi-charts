import * as React from 'react';
import 'react-native-gesture-handler';
import { TamaguiProvider, YStack, XStack, Button, Text, H3, H4, ScrollView } from 'tamagui';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import CandlestickChart from './CandlestickChart';
import LineChart from './LineChart';
import config from '../tamagui.config';

export default function App() {
  const [selected, setSelected] = React.useState('');
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TamaguiProvider config={config}>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <YStack flex={1}>
              <XStack
                paddingHorizontal="$4"
                paddingVertical="$4"
                alignItems="center"
                justifyContent="space-between"
              >
                <H3>React Native WAGMI Charts 💸</H3>
                {selected ? (
                  <Button
                    size="$3"
                    onPress={() => setSelected('')}
                  >
                    Back
                  </Button>
                ) : null}
              </XStack>
              <ScrollView>
                {!selected && (
                  <YStack paddingHorizontal="$4" marginTop="$6" space="$4">
                    <H4 marginBottom="$2">
                      Click a chart below to get started
                    </H4>
                    <Button onPress={() => setSelected('candlestick')}>
                      <Text>Candlestick</Text>
                    </Button>
                    <Button onPress={() => setSelected('line')}>
                      <Text>Line</Text>
                    </Button>
                  </YStack>
                )}
                <YStack marginTop="$4">
                  {selected === 'candlestick' && <CandlestickChart />}
                  {selected === 'line' && <LineChart />}
                </YStack>
              </ScrollView>
            </YStack>
          </SafeAreaView>
        </SafeAreaProvider>
      </TamaguiProvider>
    </GestureHandlerRootView>
  );
}
