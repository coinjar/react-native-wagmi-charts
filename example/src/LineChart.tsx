import * as React from 'react';
import * as haptics from 'expo-haptics';

import {
  YStack,
  XStack,
  Button,
  H4,
  H5,
  H6,
  RadioGroup,
  Text,
} from 'tamagui';
import {
  LineChart,
  LineChartTooltipPosition,
  TLineChartDataProp,
  TLineChartPoint,
} from 'react-native-wagmi-charts';

import { Platform } from 'react-native';
import mockData from './data/line-data.json';
import mockData2 from './data/line-data2.json';
import mockDataNonLinear from './data/line-data-non-linear-domain.json';
import { useMemo } from 'react';

function invokeHaptic() {
  if (['ios', 'android'].includes(Platform.OS)) {
    haptics.impactAsync(haptics.ImpactFeedbackStyle.Light);
  }
}

export default function App() {
  const [data, setData] = React.useState<TLineChartPoint[]>(mockData);
  
  React.useEffect(() => {
    console.log('Data state changed:', data.length, 'points, first value:', data[0]?.value);
  }, [data]);
  const [multiData, toggleMultiData] = React.useReducer(
    (state) => !state,
    false
  );
  const [partialDay, togglePartialDay] = React.useReducer(
    (state) => !state,
    false
  );
  const [at, setAt] = React.useState<number>();

  const [scaleRelativeToTime, setScaleRelativeToTime] = React.useState(false);

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

  const [toggleMinMaxLabels, setToggleMinMaxLabels] = React.useState(false);
  const [toggleSnapToPoint, setToggleSnapToPoint] = React.useState(false);
  const [toggleHighlight, setToggleHighlight] = React.useState(false);

  const [floatingTooltip, setFloatingTooltip] = React.useState(false);
  const [tooltipPosition, setTooltipPosition] =
    React.useState<LineChartTooltipPosition>('top');

  let dataProp: TLineChartDataProp = data;
  const [min, max] = useMemo(() => {
    if (Array.isArray(dataProp)) {
      const values = dataProp.map((d) => d.value);
      const _min = Math.min(...values);
      const _max = Math.max(...values);
      return [
        values.findIndex((v) => v === _min),
        values.findIndex((v) => v === _max),
      ];
    }
    return [0, 0];
  }, [dataProp]);

  let chart = (
    <LineChart>
      <LineChart.Path color="black">
        {toggleMinMaxLabels && (
          <>
            <LineChart.Gradient color="black" />
            <LineChart.Tooltip position="top" at={max} />
            <LineChart.Tooltip position="bottom" at={min} yGutter={-10} />
          </>
        )}
        {toggleHighlight && (
          <LineChart.Highlight
            color="red"
            from={Math.floor(data.length / 3)}
            to={Math.floor(data.length * (2 / 3))}
          />
        )}
      </LineChart.Path>
      <LineChart.CursorCrosshair
        snapToPoint={toggleSnapToPoint}
        onActivated={invokeHaptic}
        onEnded={invokeHaptic}
        at={at}
      >
        <LineChart.Tooltip
          position={tooltipPosition}
          withHorizontalFloating={floatingTooltip}
        />
        <LineChart.HoverTrap />
      </LineChart.CursorCrosshair>
    </LineChart>
  );

  if (multiData) {
    dataProp = {
      one: data,
      two: mockData2,
    };
    chart = (
      <LineChart.Group>
        <LineChart id="one">
          <LineChart.Path animateOnMount="foreground" color="blue" />
          <LineChart.CursorCrosshair
            snapToPoint={toggleSnapToPoint}
            onActivated={invokeHaptic}
            onEnded={invokeHaptic}
          >
            <LineChart.Tooltip
              position={tooltipPosition}
              withHorizontalFloating={floatingTooltip}
            />
          </LineChart.CursorCrosshair>
        </LineChart>
        <LineChart id="two">
          <LineChart.Path color="red">
            <LineChart.Gradient color="black" />
            <LineChart.HorizontalLine at={{ index: 4 }} />
          </LineChart.Path>
          <LineChart.CursorCrosshair
            snapToPoint={toggleSnapToPoint}
            color="hotpink"
            onActivated={invokeHaptic}
            onEnded={invokeHaptic}
          >
            <LineChart.Tooltip
              position={tooltipPosition}
              withHorizontalFloating={floatingTooltip}
            />
          </LineChart.CursorCrosshair>
        </LineChart>
      </LineChart.Group>
    );
  }

  console.log('About to render with dataProp:', Array.isArray(dataProp) ? `Array[${dataProp.length}]` : `Object{${Object.keys(dataProp).join(',')}}`);

  return (
    <>
      <H4 paddingHorizontal="$4" marginBottom="$4">
        Line Chart 📈
      </H4>
      <LineChart.Provider
        xDomain={
          scaleRelativeToTime
            ? [data[0]!.timestamp, data[data.length - 1]!.timestamp]
            : undefined
        }
        xLength={partialDay ? data.length * 2 : undefined}
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
        data={dataProp}
      >
        <YStack padding="$4">
          {chart}
        </YStack>
        <YStack marginHorizontal="$4" marginTop="$4">
          <Text fontSize="$6" fontWeight="bold" marginBottom="$4">Load Data</Text>
          <XStack flexWrap="wrap" marginBottom="$4" space="$2">
            <Button onPress={() => setData(mockData)}>Data 1</Button>
            <Button onPress={() => setData(mockData2)}>Data 2</Button>
            <Button onPress={() => setData(mockDataNonLinear)}>Data 3</Button>
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
            <Button onPress={toggleMultiData}>Multi Data</Button>
            <Button onPress={togglePartialDay}>Partial Day</Button>
            <Button onPress={() => setToggleHighlight((val) => !val)}>
              Toggle highlight
            </Button>
            <Button onPress={() => setToggleMinMaxLabels((p) => !p)}>
              Toggle min/max labels
            </Button>
            <Button
              onPress={() => {
                // Use with data 3 for best demonstration
                setScaleRelativeToTime((val) => !val);
              }}
            >
              Toggle {scaleRelativeToTime ? 'off' : 'on'} XDomain
            </Button>
            <Button onPress={() => setToggleSnapToPoint((val) => !val)}>
              Toggle Snap {toggleSnapToPoint ? 'Off' : 'On'}
            </Button>
            <Button
              onPress={() => setAt(Math.floor(Math.random() * data.length))}
            >
              Set Cursor
            </Button>
          </XStack>

          <Text marginBottom="$4">Tooltip position:</Text>
          <RadioGroup
            orientation="horizontal"
            onChange={(value) =>
              setTooltipPosition(value as LineChartTooltipPosition)
            }
            value={tooltipPosition}
            options={[
              { label: 'Top', value: 'top' },
              { label: 'Bottom', value: 'bottom' },
              { label: 'Left', value: 'left' },
              { label: 'Right', value: 'right' },
            ]}
          />

          {['left', 'right'].includes(tooltipPosition) && (
            <Button onPress={() => setFloatingTooltip((val) => !val)}>
              Toggle floating tooltip {floatingTooltip ? 'Off' : 'On'}
            </Button>
          )}
        </YStack>
        {!multiData && (
          <YStack padding="$4" space="$2">
            <Text fontSize="$6" fontWeight="bold">PriceText</Text>
            <XStack>
              <Text fontWeight="500">Formatted: </Text>
              <LineChart.PriceText />
            </XStack>
            <XStack>
              <Text fontWeight="500">Value: </Text>
              <LineChart.PriceText variant="value" />
            </XStack>
            <XStack>
              <Text fontWeight="500">Custom format: </Text>
              <LineChart.PriceText
                format={(d) => {
                  'worklet';
                  return d.formatted ? `$${d.formatted} AUD` : '';
                }}
              />
            </XStack>
            <Text fontSize="$6" fontWeight="bold">DatetimeText</Text>
            <XStack>
              <Text fontWeight="500">Formatted: </Text>
              <LineChart.DatetimeText />
            </XStack>
            <XStack>
              <Text fontWeight="500">Value: </Text>
              <LineChart.DatetimeText variant="value" />
            </XStack>
            <XStack>
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
            </XStack>
          </YStack>
        )}
      </LineChart.Provider>
    </>
  );
}
