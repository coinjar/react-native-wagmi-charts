import * as React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';
import {
  CandlestickChartProvider,
  Candles,
  Crosshair,
} from 'react-native-candlestick-chart';

import mockData from './data.json';

export default function App() {
  return (
    <View style={styles.container}>
      <CandlestickChartProvider data={mockData.slice(0, 20)}>
        <Candles />
        <Crosshair />
      </CandlestickChartProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
