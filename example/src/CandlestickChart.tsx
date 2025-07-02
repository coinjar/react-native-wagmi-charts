import * as React from 'react';
import { Platform } from 'react-native';
import { YStack, XStack, Button, H4, Text } from 'tamagui';
import { CandlestickChart, TCandle } from 'react-native-wagmi-charts';
import * as haptics from 'expo-haptics';

import mockData from './data/candlestick-data.json';
import mockData2 from './data/candlestick-data2.json';

function invokeHaptic() {
  if (['ios', 'android'].includes(Platform.OS)) {
    haptics.impactAsync(haptics.ImpactFeedbackStyle.Light);
  }
}

export default function App() {
  const [data, setData] = React.useState<TCandle[]>(mockData);

  return (
    <>
      <H4 paddingHorizontal="$4" marginBottom="$4">
        Candlestick Chart 🕯
      </H4>
      <CandlestickChart.Provider data={data}>
        <YStack padding="$4">
          <CandlestickChart height={200}>
            <CandlestickChart.Candles />
          <CandlestickChart.Crosshair onCurrentXChange={invokeHaptic}>
            <CandlestickChart.Tooltip />
          </CandlestickChart.Crosshair>
          </CandlestickChart>
        </YStack>
        <YStack marginHorizontal="$4" marginTop="$4">
          <Text fontSize="$6" fontWeight="bold" marginBottom="$4">Load Data</Text>
          <XStack flexWrap="wrap" space="$2">
            <Button onPress={() => setData(mockData)}>Data 1</Button>
            <Button onPress={() => setData(mockData2)}>Data 2</Button>
          </XStack>
        </YStack>
        <YStack padding="$4" space="$2">
          <Text fontSize="$6" fontWeight="bold">PriceText</Text>
          <YStack>
            <Text fontWeight="500">Formatted: </Text>
            <XStack>
              <YStack flex={1}>
                <Text fontSize="100">Current</Text>
                <CandlestickChart.PriceText />
              </YStack>
              <YStack flex={1}>
                <Text fontSize="100">Open</Text>
                <CandlestickChart.PriceText type="open" />
              </YStack>
              <YStack flex={1}>
                <Text fontSize="100">High</Text>
                <CandlestickChart.PriceText type="high" />
              </YStack>
              <YStack flex={1}>
                <Text fontSize="100">Low</Text>
                <CandlestickChart.PriceText type="low" />
              </YStack>
              <YStack flex={1}>
                <Text fontSize="100">Close</Text>
                <CandlestickChart.PriceText type="close" />
              </YStack>
            </XStack>
          </YStack>
          <YStack>
            <Text fontWeight="500">Value: </Text>
            <XStack>
              <YStack flex={1}>
                <Text fontSize="100">Current</Text>
                <CandlestickChart.PriceText variant="value" />
              </YStack>
              <YStack flex={1}>
                <Text fontSize="100">Open</Text>
                <CandlestickChart.PriceText type="open" variant="value" />
              </YStack>
              <YStack flex={1}>
                <Text fontSize="100">High</Text>
                <CandlestickChart.PriceText type="high" variant="value" />
              </YStack>
              <YStack flex={1}>
                <Text fontSize="100">Low</Text>
                <CandlestickChart.PriceText type="low" variant="value" />
              </YStack>
              <YStack flex={1}>
                <Text fontSize="100">Close</Text>
                <CandlestickChart.PriceText type="close" variant="value" />
              </YStack>
            </XStack>
          </YStack>
          <YStack>
            <Text fontWeight="500">Custom format: </Text>
            <XStack>
              <YStack flex={1}>
                <Text fontSize="100">Current</Text>
                <CandlestickChart.PriceText
                  format={(d) => {
                    'worklet';
                    return `$${d.formatted} AUD`;
                  }}
                />
              </YStack>
              <YStack flex={1}>
                <Text fontSize="100">Open</Text>
                <CandlestickChart.PriceText
                  type="open"
                  format={(d) => {
                    'worklet';
                    return `$${d.formatted} AUD`;
                  }}
                />
              </YStack>
              <YStack flex={1}>
                <Text fontSize="100">Close</Text>
                <CandlestickChart.PriceText
                  type="close"
                  format={(d) => {
                    'worklet';
                    return `$${d.formatted} AUD`;
                  }}
                />
              </YStack>
            </XStack>
          </YStack>
        </YStack>
        <YStack padding="$4" space="$1">
          <Text fontSize="$6" fontWeight="bold">DatetimeText</Text>
          <XStack>
            <Text fontWeight="500">Formatted: </Text>
            <CandlestickChart.DatetimeText />
          </XStack>
          <XStack>
            <Text fontWeight="500">Float: </Text>
            <CandlestickChart.DatetimeText variant="value" />
          </XStack>
          <XStack>
            <Text fontWeight="500">Custom format: </Text>
            <CandlestickChart.DatetimeText
              locale="en-AU"
              options={{
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
              }}
            />
          </XStack>
        </YStack>
      </CandlestickChart.Provider>
    </>
  );
}
