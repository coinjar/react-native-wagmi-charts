import React from 'react';
import {
  Platform,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
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
      <Text style={styles.title}>Candlestick Chart 🕯</Text>
      <CandlestickChart.Provider data={data}>
        <View style={styles.chartContainer}>
          <CandlestickChart>
            <CandlestickChart.Candles />
            <CandlestickChart.Crosshair onCurrentXChange={invokeHaptic}>
              <CandlestickChart.Tooltip />
            </CandlestickChart.Crosshair>
          </CandlestickChart>
        </View>
        <View style={styles.controlsContainer}>
          <Text style={styles.sectionTitle}>Load Data</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setData(mockData)}
            >
              <Text style={styles.buttonText}>Data 1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setData(mockData2)}
            >
              <Text style={styles.buttonText}>Data 2</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.priceTextContainer}>
          <Text style={styles.sectionTitle}>PriceText</Text>
          <View>
            <Text style={[styles.priceTextlabel, styles.noMarginTop]}>
              Formatted:{' '}
            </Text>
            <View style={styles.priceRow}>
              <View style={styles.priceColumn}>
                <Text style={styles.priceLabel}>Current</Text>
                <CandlestickChart.PriceText style={styles.chartValueText} />
              </View>
              <View style={styles.priceColumn}>
                <Text style={styles.priceLabel}>Open</Text>
                <CandlestickChart.PriceText
                  type="open"
                  style={styles.chartValueText}
                />
              </View>
              <View style={styles.priceColumn}>
                <Text style={styles.priceLabel}>High</Text>
                <CandlestickChart.PriceText
                  type="high"
                  style={styles.chartValueText}
                />
              </View>
              <View style={styles.priceColumn}>
                <Text style={styles.priceLabel}>Low</Text>
                <CandlestickChart.PriceText
                  type="low"
                  style={styles.chartValueText}
                />
              </View>
              <View style={styles.priceColumn}>
                <Text style={styles.priceLabel}>Close</Text>
                <CandlestickChart.PriceText
                  type="close"
                  style={styles.chartValueText}
                />
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.priceTextlabel}>Value: </Text>
            <View style={styles.priceRow}>
              <View style={styles.priceColumn}>
                <Text style={styles.priceLabel}>Current</Text>
                <CandlestickChart.PriceText
                  variant="value"
                  style={styles.chartValueText}
                />
              </View>
              <View style={styles.priceColumn}>
                <Text style={styles.priceLabel}>Open</Text>
                <CandlestickChart.PriceText
                  type="open"
                  variant="value"
                  style={styles.chartValueText}
                />
              </View>
              <View style={styles.priceColumn}>
                <Text style={styles.priceLabel}>High</Text>
                <CandlestickChart.PriceText
                  type="high"
                  variant="value"
                  style={styles.chartValueText}
                />
              </View>
              <View style={styles.priceColumn}>
                <Text style={styles.priceLabel}>Low</Text>
                <CandlestickChart.PriceText
                  type="low"
                  variant="value"
                  style={styles.chartValueText}
                />
              </View>
              <View style={styles.priceColumn}>
                <Text style={styles.priceLabel}>Close</Text>
                <CandlestickChart.PriceText
                  type="close"
                  variant="value"
                  style={styles.chartValueText}
                />
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.priceTextlabel}>Custom format: </Text>
            <View style={styles.priceRow}>
              <View style={styles.priceColumn}>
                <Text style={styles.priceLabel}>Current</Text>
                <CandlestickChart.PriceText
                  style={styles.chartValueText}
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
                  style={styles.chartValueText}
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
                  style={styles.chartValueText}
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
          <View style={[styles.row, styles.noMarginTop]}>
            <Text style={styles.dateTimelabel}>Formatted: </Text>
            <CandlestickChart.DatetimeText style={styles.chartValueText} />
          </View>
          <View style={styles.row}>
            <Text style={styles.dateTimelabel}>Float: </Text>
            <CandlestickChart.DatetimeText
              variant="value"
              style={styles.chartValueText}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.dateTimelabel}>Custom format: </Text>
            <CandlestickChart.DatetimeText
              style={styles.chartValueText}
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
    paddingVertical: 16,
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
  priceTextContainer: {
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceTextlabel: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 16,
    marginBottom: 8,
  },
  priceColumn: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  dateTimeContainer: {
    padding: 32,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 2,
  },
  dateTimelabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  chartValueText: {
    lineHeight: Platform.OS === 'android' ? 1 : undefined,
  },
  noMarginTop: {
    marginTop: 0,
  },
});
