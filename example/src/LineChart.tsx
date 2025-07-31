import React, { useMemo } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import {
  LineChart,
  LineChartTooltipPosition,
  TLineChartDataProp,
  TLineChartPoint,
} from 'react-native-wagmi-charts';
import * as haptics from 'expo-haptics';

import mockData from './data/line-data.json';
import mockData2 from './data/line-data2.json';
import mockDataNonLinear from './data/line-data-non-linear-domain.json';

function invokeHaptic() {
  if (['ios', 'android'].includes(Platform.OS)) {
    haptics.impactAsync(haptics.ImpactFeedbackStyle.Light);
  }
}

export default function App() {
  const [data, setData] = React.useState<TLineChartPoint[]>(mockData);
  
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

  if (multiData) {
    dataProp = {
      one: mockData,
      two: mockData2,
    };
  }

  return (
    <>
      <Text style={styles.title}>
        Line Chart 📈
      </Text>
      <LineChart.Provider
        key={JSON.stringify(dataProp)}
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
        {multiData ? (
          <View style={styles.chartContainer}>
            <LineChart.Group>
              <LineChart id="one" height={200}>
                <LineChart.Path color="blue" />
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
              <LineChart id="two" height={200}>
                <LineChart.Path color="red">
                  <LineChart.Gradient color="red" />
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
          </View>
        ) : (
          <View style={styles.chartContainer}>
            <LineChart height={200}>
              <LineChart.Path color="black" width={3}>
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
                color="hotpink"
              >
                <LineChart.Tooltip
                  position={tooltipPosition}
                  withHorizontalFloating={floatingTooltip}
                />
                <LineChart.HoverTrap />
              </LineChart.CursorCrosshair>
            </LineChart>
          </View>
        )}
        <View style={styles.controlsContainer}>
          <Text style={styles.sectionTitle}>Load Data</Text>
          <View style={styles.buttonGrid}>
            <TouchableOpacity style={styles.button} onPress={() => setData([...mockData])}>
              <Text style={styles.buttonText}>Data 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setData([...mockData2])}>
              <Text style={styles.buttonText}>Data 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setData([...mockDataNonLinear])}>
              <Text style={styles.buttonText}>Data 3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setData([...mockData, ...mockData2])}>
              <Text style={styles.buttonText}>Data 1 + Data 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setData([...mockData2, ...mockData])}>
              <Text style={styles.buttonText}>Data 2 + Data 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setData([...mockData2, ...mockData, ...mockData2])}>
              <Text style={styles.buttonText}>Data 2 + Data 1 + Data 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() =>
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
              }>
              <Text style={styles.buttonText}>V large data</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={toggleYRange}>
              <Text style={styles.buttonText}>{`${yRange || 'Set'} Y Domain`}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={toggleMultiData}>
              <Text style={styles.buttonText}>Multi Data</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={togglePartialDay}>
              <Text style={styles.buttonText}>Partial Day</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setToggleHighlight((val) => !val)}>
              <Text style={styles.buttonText}>Toggle highlight</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setToggleMinMaxLabels((p) => !p)}>
              <Text style={styles.buttonText}>Toggle min/max labels</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {
                // Use with data 3 for best demonstration
                setScaleRelativeToTime((val) => !val);
              }}>
              <Text style={styles.buttonText}>Toggle {scaleRelativeToTime ? 'off' : 'on'} XDomain</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setToggleSnapToPoint((val) => !val)}>
              <Text style={styles.buttonText}>Toggle Snap {toggleSnapToPoint ? 'Off' : 'On'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setAt(Math.floor(Math.random() * data.length))}>
              <Text style={styles.buttonText}>Set Cursor</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Tooltip position:</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={[styles.radioButton, tooltipPosition === 'top' && styles.radioButtonSelected]}
              onPress={() => setTooltipPosition('top')}
            >
              <Text style={[styles.radioText, tooltipPosition === 'top' && styles.radioTextSelected]}>Top</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, tooltipPosition === 'bottom' && styles.radioButtonSelected]}
              onPress={() => setTooltipPosition('bottom')}
            >
              <Text style={[styles.radioText, tooltipPosition === 'bottom' && styles.radioTextSelected]}>Bottom</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, tooltipPosition === 'left' && styles.radioButtonSelected]}
              onPress={() => setTooltipPosition('left')}
            >
              <Text style={[styles.radioText, tooltipPosition === 'left' && styles.radioTextSelected]}>Left</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, tooltipPosition === 'right' && styles.radioButtonSelected]}
              onPress={() => setTooltipPosition('right')}
            >
              <Text style={[styles.radioText, tooltipPosition === 'right' && styles.radioTextSelected]}>Right</Text>
            </TouchableOpacity>
          </View>

          {['left', 'right'].includes(tooltipPosition) && (
            <TouchableOpacity style={styles.button} onPress={() => setFloatingTooltip((val) => !val)}>
              <Text style={styles.buttonText}>Toggle floating tooltip {floatingTooltip ? 'Off' : 'On'}</Text>
            </TouchableOpacity>
          )}
        </View>
        {!multiData && (
          <View style={styles.priceTextContainer}>
            <Text style={styles.sectionTitle}>PriceText</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Formatted: </Text>
              <LineChart.PriceText />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Value: </Text>
              <LineChart.PriceText variant="value" />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Custom format: </Text>
              <LineChart.PriceText
                format={(d) => {
                  'worklet';
                  return d.formatted ? `$${d.formatted} AUD` : '';
                }}
              />
            </View>
            <Text style={styles.sectionTitle}>DatetimeText</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Formatted: </Text>
              <LineChart.DatetimeText />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Value: </Text>
              <LineChart.DatetimeText variant="value" />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Custom format: </Text>
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
            </View>
          </View>
        )}
      </LineChart.Provider>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  chartContainer: {
    padding: 16,
  },
  controlsContainer: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  radioGroup: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  radioButtonSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  radioText: {
    fontSize: 14,
    color: '#333',
  },
  radioTextSelected: {
    color: 'white',
  },
  priceTextContainer: {
    padding: 16,
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
