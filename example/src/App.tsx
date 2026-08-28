import * as React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import type { ThemeColors } from './theme';
import { ThemeProvider, useTheme, useThemedStyles } from './theme';
import { ControlChip } from './ChartControls';
import CandlestickChartScreen from './CandlestickChart';
import LineChartScreen from './LineChart';

const CHARTS = [
  { key: 'line', label: 'Line 📈', Screen: LineChartScreen },
  {
    key: 'candlestick',
    label: 'Candlestick 🕯',
    Screen: CandlestickChartScreen,
  },
] as const;

function AppContent() {
  const { theme, colors, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useThemedStyles(createStyles);

  const [active, setActive] =
    React.useState<(typeof CHARTS)[number]['key']>('line');
  const { Screen } = CHARTS.find((chart) => chart.key === active)!;

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <View style={styles.header}>
        {CHARTS.map(({ key, label }) => (
          <ControlChip
            key={key}
            label={label}
            selected={key === active}
            onPress={() => setActive(key)}
          />
        ))}
        <View style={styles.spacer} />
        <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
          <Text style={styles.themeButtonText}>
            {theme === 'light' ? 'Dark' : 'Light'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <Screen />
      </ScrollView>
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <GestureHandlerRootView style={appStyles.root}>
        <SafeAreaProvider>
          <AppContent />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

const appStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    spacer: {
      flex: 1,
    },
    themeButton: {
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    themeButtonText: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.primary,
    },
  });
