import * as React from 'react';
import { Box, Flex, Heading, Text, Stack } from 'bumbag-native';
import { CandlestickChart } from 'react-native-wagmi-charts';

import mockData from './candlestick-data.json';

export default function App() {
  return (
    <>
      <Heading.H5 paddingX="major-2" marginBottom="major-2">
        React Native Candlestick Chart 🕯
      </Heading.H5>
      <CandlestickChart.Provider data={mockData}>
        <Box>
          <CandlestickChart.Candles />
          <CandlestickChart.Crosshair showTooltip />
        </Box>
        <Stack padding="major-2" spacing="major-1">
          <Heading.H6>PriceText</Heading.H6>
          <Box>
            <Text fontWeight="500">Formatted: </Text>
            <Flex>
              <Box flex="1">
                <Text fontSize="100">Current</Text>
                <CandlestickChart.PriceText />
              </Box>
              <Box flex="1">
                <Text fontSize="100">Open</Text>
                <CandlestickChart.PriceText type="open" />
              </Box>
              <Box flex="1">
                <Text fontSize="100">High</Text>
                <CandlestickChart.PriceText type="high" />
              </Box>
              <Box flex="1">
                <Text fontSize="100">Low</Text>
                <CandlestickChart.PriceText type="low" />
              </Box>
              <Box flex="1">
                <Text fontSize="100">Close</Text>
                <CandlestickChart.PriceText type="close" />
              </Box>
            </Flex>
          </Box>
          <Box>
            <Text fontWeight="500">Value: </Text>
            <Flex>
              <Box flex="1">
                <Text fontSize="100">Current</Text>
                <CandlestickChart.PriceText variant="value" />
              </Box>
              <Box flex="1">
                <Text fontSize="100">Open</Text>
                <CandlestickChart.PriceText type="open" variant="value" />
              </Box>
              <Box flex="1">
                <Text fontSize="100">High</Text>
                <CandlestickChart.PriceText type="high" variant="value" />
              </Box>
              <Box flex="1">
                <Text fontSize="100">Low</Text>
                <CandlestickChart.PriceText type="low" variant="value" />
              </Box>
              <Box flex="1">
                <Text fontSize="100">Close</Text>
                <CandlestickChart.PriceText type="close" variant="value" />
              </Box>
            </Flex>
          </Box>
          <Box>
            <Text fontWeight="500">Custom format: </Text>
            <Flex>
              <Box flex="1">
                <Text fontSize="100">Current</Text>
                <CandlestickChart.PriceText
                  format={(d: any) => {
                    'worklet';
                    return `$${d.formatted} AUD`;
                  }}
                />
              </Box>
              <Box flex="1">
                <Text fontSize="100">Open</Text>
                <CandlestickChart.PriceText
                  type="open"
                  format={(d: any) => {
                    'worklet';
                    return `$${d.formatted} AUD`;
                  }}
                />
              </Box>
              <Box flex="1">
                <Text fontSize="100">Close</Text>
                <CandlestickChart.PriceText
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
            <CandlestickChart.DatetimeText />
          </Flex>
          <Flex>
            <Text fontWeight="500">Float: </Text>
            <CandlestickChart.DatetimeText variant="value" />
          </Flex>
          <Flex>
            <Text fontWeight="500">Custom format: </Text>
            <CandlestickChart.DatetimeText
              locale="en-AU"
              options={{
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              }}
            />
          </Flex>
        </Stack>
      </CandlestickChart.Provider>
    </>
  );
}
