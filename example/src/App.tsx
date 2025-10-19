import * as React from 'react';
import {
  Platform,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import CandlestickChart from './CandlestickChart';
import LineChart from './LineChart';

export default function App() {
  const [selected, setSelected] = React.useState('');
  return (
    <GestureHandlerRootView style={styles.flex}>
      <SafeAreaProvider>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <SafeAreaView style={styles.flex}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>React Native WAGMI Charts 💸</Text>
              <TouchableOpacity
                style={[styles.button, !selected && styles.hiddenButton]}
                onPress={() => setSelected('')}
                disabled={!selected}
              >
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
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
              {selected === 'candlestick' && <CandlestickChart />}
              {selected === 'line' && <LineChart />}
            </ScrollView>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
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
    fontSize: Platform.OS === 'web' ? 24 : 20,
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
  hiddenButton: {
    opacity: 0,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    marginTop: 24,
    gap: 16,
  },
});
