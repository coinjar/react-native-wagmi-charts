import * as React from 'react';
import { Box, Button, Flex, Heading, Stack, Text } from 'bumbag-native';
import { LineChart, TLineChartPoint } from 'react-native-wagmi-charts';
import * as haptics from 'expo-haptics';
import { Platform } from 'react-native';

import mockData from './data/line-data.json';
import mockData2 from './data/line-data2.json';

function invokeHaptic() {
  if (['ios', 'android'].includes(Platform.OS)) {
    haptics.impactAsync(haptics.ImpactFeedbackStyle.Light);
  }
}

export default function App() {
  const [data, setData] = React.useState<TLineChartPoint[]>(mockData);

  const [yRange, setYRange] = React.useState<undefined | 'low' | 'high'>(
    undefined
  );

  const toggleYRange = () => {
    setYRange((domain) => {
      if (!domain) {
        return 'low';
      }
      if (domain === 'low') {
        return 'high';
      }
      return undefined;
    });
  };

  return (
    <>
      <Heading.H5 paddingX="major-2" marginBottom="major-2">
        Line Chart 📈
      </Heading.H5>
      <LineChart.Provider
        yRange={{
          min:
            yRange === 'low'
              ? Math.min(...data.map((d) => d.value)) / 1.1
              : undefined,
          max:
            yRange === 'high'
              ? Math.max(...data.map((d) => d.value)) * 1.1
              : undefined,
        }}
        data={data}
      >
        <LineChart>
          <LineChart.Path color="red">
            <LineChart.Gradient color="black" />
            <LineChart.HorizontalLine at={{ value: 33215.61 }} />
          </LineChart.Path>
          <LineChart.CursorCrosshair
            onActivated={invokeHaptic}
            onEnded={invokeHaptic}
          >
            <LineChart.Tooltip />
            {/* <LineChart.Tooltip position="bottom">
              <LineChart.DatetimeText />
            </LineChart.Tooltip> */}
          </LineChart.CursorCrosshair>
        </LineChart>
        <Box marginX="major-2" marginTop="major-2">
          <Heading.H6 marginBottom={'major-2'}>Load Data</Heading.H6>
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
            <Button onPress={toggleYRange}>
              {`${yRange || 'Set'} Y Domain`}
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
