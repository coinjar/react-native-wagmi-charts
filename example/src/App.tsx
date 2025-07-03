import * as React from 'react';
import { View, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import CandlestickChart from './CandlestickChart';
import LineChart from './LineChart';

export default function App() {
  const [selected, setSelected] = React.useState('');
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>React Native WAGMI Charts 💸</Text>
            {selected ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => setSelected('')}
              >
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <ScrollView>
            {!selected && (
              <View style={styles.buttonContainer}>
                <Text style={styles.subtitle}>
                  Click a chart below to get started
                </Text>
                <TouchableOpacity
                  style={styles.chartButton}
                  onPress={() => setSelected('candlestick')}
                >
                  <Text style={styles.buttonText}>Candlestick</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.chartButton}
                  onPress={() => setSelected('line')}
                >
                  <Text style={styles.buttonText}>Line</Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.chartContainer}>
              {selected === 'candlestick' && <CandlestickChart />}
              {selected === 'line' && <LineChart />}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  chartButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
  },
  buttonContainer: {
    paddingHorizontal: 16,
    marginTop: 24,
    gap: 16,
  },
  chartContainer: {
    marginTop: 16,
  },
});
