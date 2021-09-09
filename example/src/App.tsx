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
  PriceText,
  DatetimeText,
} from 'react-native-wagmi-charts';

import mockData from './data.json';

export default function App() {
  return (
    <BumbagNativeProvider>
      <Box.Safe flex="1">
        <Box.Scroll>
          <Heading.H5 paddingX="major-2" marginBottom="major-2">
            React Native Candlestick Chart 🕯
          </Heading.H5>
          <CandlestickChartProvider data={mockData}>
            <Box>
              <Candles />
              <Crosshair showTooltip />
            </Box>
            <Stack padding="major-2" spacing="major-1">
              <Heading.H6>PriceText</Heading.H6>
              <Box>
                <Text fontWeight="500">Formatted: </Text>
                <Flex>
                  <Box flex="1">
                    <Text fontSize="100">Current</Text>
                    <PriceText />
                  </Box>
                  <Box flex="1">
                    <Text fontSize="100">Open</Text>
                    <PriceText type="open" />
                  </Box>
                  <Box flex="1">
                    <Text fontSize="100">High</Text>
                    <PriceText type="high" />
                  </Box>
                  <Box flex="1">
                    <Text fontSize="100">Low</Text>
                    <PriceText type="low" />
                  </Box>
                  <Box flex="1">
                    <Text fontSize="100">Close</Text>
                    <PriceText type="close" />
                  </Box>
                </Flex>
              </Box>
              <Box>
                <Text fontWeight="500">Value: </Text>
                <Flex>
                  <Box flex="1">
                    <Text fontSize="100">Current</Text>
                    <PriceText variant="value" />
                  </Box>
                  <Box flex="1">
                    <Text fontSize="100">Open</Text>
                    <PriceText type="open" variant="value" />
                  </Box>
                  <Box flex="1">
                    <Text fontSize="100">High</Text>
                    <PriceText type="high" variant="value" />
                  </Box>
                  <Box flex="1">
                    <Text fontSize="100">Low</Text>
                    <PriceText type="low" variant="value" />
                  </Box>
                  <Box flex="1">
                    <Text fontSize="100">Close</Text>
                    <PriceText type="close" variant="value" />
                  </Box>
                </Flex>
              </Box>
              <Box>
                <Text fontWeight="500">Custom format: </Text>
                <Flex>
                  <Box flex="1">
                    <Text fontSize="100">Current</Text>
                    <PriceText
                      format={(d: any) => {
                        'worklet';
                        return `$${d.formatted} AUD`;
                      }}
                    />
                  </Box>
                  <Box flex="1">
                    <Text fontSize="100">Open</Text>
                    <PriceText
                      type="open"
                      format={(d: any) => {
                        'worklet';
                        return `$${d.formatted} AUD`;
                      }}
                    />
                  </Box>
                  <Box flex="1">
                    <Text fontSize="100">Close</Text>
                    <PriceText
                      type="close"
                      format={(d: any) => {
                        'worklet';
                        return `$${d.formatted} AUD`;
                      }}
                    />
                  </Box>
                </Flex>
              </Box>
            </Stack>
            <Stack padding="major-2" spacing="minor-1">
              <Heading.H6>DatetimeText</Heading.H6>
              <Flex>
                <Text fontWeight="500">Formatted: </Text>
                <DatetimeText />
              </Flex>
              <Flex>
                <Text fontWeight="500">Float: </Text>
                <DatetimeText variant="value" />
              </Flex>
              <Flex>
                <Text fontWeight="500">Custom format: </Text>
                <DatetimeText
                  locale="en-AU"
                  options={{
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                  }}
                />
              </Flex>
            </Stack>
          </CandlestickChartProvider>
        </Box.Scroll>
      </Box.Safe>
    </BumbagNativeProvider>
  );
}
