import * as React from 'react';
import { Box, Button, Flex, Heading, Stack, Text } from 'bumbag-native';
import { LineChart, TLineChartPoint } from 'react-native-wagmi-charts';
import * as haptics from 'expo-haptics';

import mockData from './data/line-data.json';
import mockData2 from './data/line-data2.json';

function invokeHaptic() {
  haptics.impactAsync(haptics.ImpactFeedbackStyle.Light);
}

export default function App() {
  const [data, setData] = React.useState<TLineChartPoint[]>(mockData);

  return (
    <>
      <Heading.H5 paddingX="major-2" marginBottom="major-2">
        Line Chart 📈
      </Heading.H5>
      <LineChart.Provider data={data}>
        <LineChart>
          <LineChart.Path color="lightgray">
            <LineChart.Color color="#10b981" from={10} to={15} />
            {/* <LineChart.Gradient /> */}
          </LineChart.Path>
          <LineChart.CursorCrosshair
            color="hotpink"
            onActivated={invokeHaptic}
            onEnded={invokeHaptic}
          >
            {/* <LineChart.Tooltip /> */}
            {/* <LineChart.Tooltip position="bottom">
              <LineChart.DatetimeText />
            </LineChart.Tooltip> */}
          </LineChart.CursorCrosshair>
        </LineChart>
        <Heading.H6>Load Data</Heading.H6>
        <Box marginTop="major-2">
          <Flex flexWrap={'wrap'}>
            <Button onPress={() => setData(mockData)}>Data 1</Button>
            <Button onPress={() => setData(mockData2)}>Data 2</Button>
            <Button onPress={() => setData([...mockData, ...mockData2])}>
              Data 1 + Data 2
            </Button>
            <Button onPress={() => setData([...mockData2, ...mockData])}>
              Data 2 + Data 1
            </Button>
            <Button
              onPress={() => setData([...mockData2, ...mockData, ...mockData2])}
            >
              Data 2 + Data 1 + Data 2
            </Button>
            <Button
              onPress={() =>
                setData([
                  ...mockData2,
                  ...mockData,
                  ...mockData2,
                  ...mockData,
                  ...mockData,
                  ...mockData2,
                  ...mockData2,
                  ...mockData,
                  ...mockData2,
                  ...mockData,
                  ...mockData,
                  ...mockData2,
                ])
              }
            >
              V large data
            </Button>
          </Flex>
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
              format={(d) => {
                'worklet';
                return d.formatted ? `$${d.formatted} AUD` : '';
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
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
              }}
            />
          </Flex>
        </Stack>
      </LineChart.Provider>
    </>
  );
}
