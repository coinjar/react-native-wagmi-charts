import * as React from 'react';
import { Box, Button, Flex, Heading, Stack, Text } from 'bumbag-native';
import { LineChart } from 'react-native-wagmi-charts';

import mockData from './line-data.json';
import mockData2 from './line-data2.json';

export default function App() {
  const [data, setData] = React.useState(mockData);
  return (
    <>
      <Heading.H5 paddingX="major-2" marginBottom="major-2">
        WAGMI Line Chart 📈
      </Heading.H5>
      <LineChart.Provider data={data}>
        <LineChart>
          <LineChart.Path />
          <LineChart.CursorCrosshair>
            {/* <LineChart.CursorTooltip /> */}
            {/* <LineChart.CursorTooltip position="bottom">
              <LineChart.DatetimeText />
            </LineChart.CursorTooltip> */}
          </LineChart.CursorCrosshair>
        </LineChart>
        <Box paddingX="major-2">
          <LineChart.PriceText />
          <LineChart.DatetimeText />
        </Box>
        <Box marginTop="major-2">
          <Button onPress={() => setData(mockData)}>Data 1</Button>
          <Button onPress={() => setData(mockData2)}>Data 2</Button>
        </Box>
        <Stack padding="major-2" spacing="major-1">
          <Heading.H6>PriceText</Heading.H6>
          <Flex>
            <Text fontWeight="500">Formatted: </Text>
            <LineChart.PriceText />
          </Flex>
          <Flex>
            <Text fontWeight="500">Value: </Text>
            <LineChart.PriceText variant="value" />
          </Flex>
          <Flex>
            <Text fontWeight="500">Custom format: </Text>
            <LineChart.PriceText
              format={(d: any) => {
                'worklet';
                return `$${d.formatted} AUD`;
              }}
            />
          </Flex>
          <Heading.H6>DatetimeText</Heading.H6>
          <Flex>
            <Text fontWeight="500">Formatted: </Text>
            <LineChart.DatetimeText />
          </Flex>
          <Flex>
            <Text fontWeight="500">Value: </Text>
            <LineChart.DatetimeText variant="value" />
          </Flex>
          <Flex>
            <Text fontWeight="500">Custom format: </Text>
            <LineChart.DatetimeText
              locale="en-AU"
              options={{
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              }}
            />
          </Flex>
        </Stack>
      </LineChart.Provider>
    </>
  );
}
