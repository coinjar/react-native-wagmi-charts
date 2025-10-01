import React from 'react';
import { Platform, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
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
      <Text style={styles.title}>
        Candlestick Chart 🕯
      </Text>
      <CandlestickChart.Provider data={data}>
        <View style={styles.chartContainer}>
          <CandlestickChart height={200}>
            <CandlestickChart.Candles />
          <CandlestickChart.Crosshair onCurrentXChange={invokeHaptic}>
            <CandlestickChart.Tooltip />
          </CandlestickChart.Crosshair>
          </CandlestickChart>
        </View>
        <View style={styles.controlsContainer}>
          <Text style={styles.sectionTitle}>Load Data</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={() => setData(mockData)}>
              <Text style={styles.buttonText}>Data 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setData(mockData2)}>
              <Text style={styles.buttonText}>Data 2</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.priceTextContainer}>
          <Text style={styles.sectionTitle}>PriceText</Text>
          <View>
            <Text style={styles.label}>Formatted: </Text>
            <View style={styles.priceRow}>
              <View style={styles.priceColumn}>
                <Text style={styles.priceLabel}>Current</Text>
                <CandlestickChart.PriceText />
              </View>
              <View style={styles.priceColumn}>
                <Text style={styles.priceLabel}>Open</Text>
                <CandlestickChart.PriceText type="open" />
              </View>
              <View style={styles.priceColumn}>
                <Text style={styles.priceLabel}>High</Text>
                <CandlestickChart.PriceText type="high" />
              </View>
              <View style={styles.priceColumn}>
                <Text style={styles.priceLabel}>Low</Text>
                <CandlestickChart.PriceText type="low" />
              </View>
              <View style={styles.priceColumn}>
                <Text style={styles.priceLabel}>Close</Text>
                <CandlestickChart.PriceText type="close" />
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.label}>Value: </Text>
            <View style={styles.priceRow}>
              <View style={styles.priceColumn}>
                <Text style={styles.priceLabel}>Current</Text>
                <CandlestickChart.PriceText variant="value" />
              </View>
              <View style={styles.priceColumn}>
                <Text style={styles.priceLabel}>Open</Text>
                <CandlestickChart.PriceText type="open" variant="value" />
              </View>
              <View style={styles.priceColumn}>
                <Text style={styles.priceLabel}>High</Text>
                <CandlestickChart.PriceText type="high" variant="value" />
              </View>
              <View style={styles.priceColumn}>
                <Text style={styles.priceLabel}>Low</Text>
                <CandlestickChart.PriceText type="low" variant="value" />
              </View>
              <View style={styles.priceColumn}>
                <Text style={styles.priceLabel}>Close</Text>
                <CandlestickChart.PriceText type="close" variant="value" />
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.label}>Custom format: </Text>
            <View style={styles.priceRow}>
              <View style={styles.priceColumn}>
                <Text style={styles.priceLabel}>Current</Text>
                <CandlestickChart.PriceText
                  format={(d) => {
                    'worklet';
                    return `$${d.formatted} AUD`;
                  }}
                />
              </View>
              <View style={styles.priceColumn}>
                <Text style={styles.priceLabel}>Open</Text>
                <CandlestickChart.PriceText
                  type="open"
                  format={(d) => {
                    'worklet';
                    return `$${d.formatted} AUD`;
                  }}
                />
              </View>
              <View style={styles.priceColumn}>
                <Text style={styles.priceLabel}>Close</Text>
                <CandlestickChart.PriceText
                  type="close"
                  format={(d) => {
                    'worklet';
                    return `$${d.formatted} AUD`;
                  }}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.sectionTitle}>DatetimeText</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Formatted: </Text>
            <CandlestickChart.DatetimeText />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Float: </Text>
            <CandlestickChart.DatetimeText variant="value" />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Custom format: </Text>
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
          </View>
        </View>
      </CandlestickChart.Provider>
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
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
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
  priceTextContainer: {
    padding: 16,
    gap: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceColumn: {
    flex: 1,
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  dateTimeContainer: {
    padding: 16,
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
