import React, { useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { runOnJS, useAnimatedReaction } from 'react-native-reanimated';
import {
  CandlestickChart,
  useCandlestickChart,
} from 'react-native-wagmi-charts';

import { candles, reversedCandles } from './data';
import { useTheme } from './theme';
import type { ChartScreenProps } from './ChartScreen';
import {
  ChartScreen,
  TextDemos,
  invokeHaptic,
  useChartSize,
  useDemoStyles,
} from './ChartScreen';
import { ControlGroup, ControlSegmented } from './ChartControls';

const DATASETS = { '1': candles, '2': reversedCandles };
type DatasetKey = keyof typeof DATASETS;
const DATASET_KEYS = Object.keys(DATASETS) as DatasetKey[];

const COLOR_SCHEMES = ['default', 'custom'] as const;
const MARGINS = ['0', '2', '6'] as const;
const Y_RANGES = ['auto', 'padded'] as const;

const CUSTOM_COLORS = {
  light: { positiveColor: '#1E6EF4', negativeColor: '#FF8D28' },
  dark: { positiveColor: '#0091FF', negativeColor: '#FF9230' },
};

/** Each reads one price off the crosshair's current candle. */
const PRICE_COLUMNS = [
  { label: 'Open', type: 'open' },
  { label: 'High', type: 'high' },
  { label: 'Low', type: 'low' },
  { label: 'Close', type: 'close' },
] as const;

/**
 * Sits inside the provider so it can watch the crosshair, which parks
 * `currentX` at -1 rather than exposing an active flag or an end callback.
 */
function Screen(props: Omit<ChartScreenProps, 'scrubbing'>) {
  const { currentX } = useCandlestickChart();
  const [scrubbing, setScrubbing] = useState(false);

  useAnimatedReaction(
    () => currentX.value !== -1,
    (active, previous) => {
      if (active !== previous) runOnJS(setScrubbing)(active);
    },
    [currentX]
  );

  return <ChartScreen {...props} scrubbing={scrubbing} />;
}

export default function CandlestickChartScreen() {
  const { colors, theme } = useTheme();
  const demo = useDemoStyles();
  const size = useChartSize();

  const [dataset, setDataset] = useState<DatasetKey>('1');
  const [colorScheme, setColorScheme] =
    useState<(typeof COLOR_SCHEMES)[number]>('default');
  const [margin, setMargin] = useState<(typeof MARGINS)[number]>('2');
  const [yRange, setYRange] = useState<(typeof Y_RANGES)[number]>('auto');

  const data = DATASETS[dataset];

  const valueRangeY = useMemo<[number, number] | undefined>(() => {
    if (yRange === 'auto') return undefined;

    const low = Math.min(...data.map((candle) => candle.low));
    const high = Math.max(...data.map((candle) => candle.high));
    const pad = (high - low) * 0.25;

    return [low - pad, high + pad];
  }, [data, yRange]);

  const chart = (
    <CandlestickChart width={size} height={size}>
      <CandlestickChart.Candles
        margin={Number(margin)}
        {...(colorScheme === 'custom' ? CUSTOM_COLORS[theme] : undefined)}
      />
      <CandlestickChart.Crosshair
        onCurrentXChange={invokeHaptic}
        color={colors.text}
      >
        <CandlestickChart.Tooltip
          style={demo.tooltip}
          textStyle={demo.tooltipText}
        />
      </CandlestickChart.Crosshair>
    </CandlestickChart>
  );

  const readouts = (
    <TextDemos
      PriceText={CandlestickChart.PriceText}
      DatetimeText={CandlestickChart.DatetimeText}
    >
      <View style={demo.priceRow}>
        {PRICE_COLUMNS.map(({ label, type }) => (
          <View key={label} style={demo.priceColumn}>
            <Text style={demo.priceLabel}>{label}</Text>
            <CandlestickChart.PriceText type={type} style={demo.value} />
          </View>
        ))}
      </View>
    </TextDemos>
  );

  const controls = (
    <>
      <ControlGroup title="Data">
        <ControlSegmented
          options={DATASET_KEYS}
          value={dataset}
          onChange={setDataset}
        />
      </ControlGroup>

      <ControlGroup title="Colors">
        <ControlSegmented
          options={COLOR_SCHEMES}
          value={colorScheme}
          onChange={setColorScheme}
        />
      </ControlGroup>

      <ControlGroup title="Margin">
        <ControlSegmented
          options={MARGINS}
          value={margin}
          onChange={setMargin}
        />
      </ControlGroup>

      <ControlGroup title="Y Range">
        <ControlSegmented
          options={Y_RANGES}
          value={yRange}
          onChange={setYRange}
        />
      </ControlGroup>
    </>
  );

  return (
    <CandlestickChart.Provider data={data} valueRangeY={valueRangeY}>
      <Screen chart={chart} readouts={readouts} controls={controls} />
    </CandlestickChart.Provider>
  );
}
