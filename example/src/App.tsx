import * as React from 'react';
import 'react-native-gesture-handler';
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Provider as BumbagNativeProvider,
} from 'bumbag-native';
import {
  CandlestickChartProvider,
  Candles,
  Crosshair,
  CurrentPriceText,
} from 'react-native-candlestick-chart';

import mockData from './data.json';

export default function App() {
  return (
    <BumbagNativeProvider>
      <Box.Safe flex="1">
        <Heading.H5 paddingX="major-2" marginBottom="major-2">
          React Native Candlestick Chart 🕯
        </Heading.H5>
        <CandlestickChartProvider data={mockData.slice(0, 20)}>
          <Box>
            <Candles />
            <Crosshair />
          </Box>
          <Stack padding="major-2" spacing="minor-1">
            <Heading.H6>CurrentPriceText</Heading.H6>
            <Flex>
              <Text fontWeight="500">Formatted: </Text>
              <CurrentPriceText />
            </Flex>
            <Flex>
              <Text fontWeight="500">Float: </Text>
              <CurrentPriceText variant="float" />
            </Flex>
            <Flex>
              <Text fontWeight="500">Custom format: </Text>
              <CurrentPriceText
                format={(d: any) => {
                  'worklet';
                  return `$${d.formatted} AUD`;
                }}
              />
            </Flex>
          </Stack>
        </CandlestickChartProvider>
      </Box.Safe>
    </BumbagNativeProvider>
  );
}
