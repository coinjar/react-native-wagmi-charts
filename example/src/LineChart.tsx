import React, { useMemo, useState } from 'react';
import type {
  LineChartTooltipPosition,
  TLineChartDataProp,
  TLineChartPoint,
} from 'react-native-wagmi-charts';
import { LineChart } from 'react-native-wagmi-charts';

import { gapLine, lineData, lineData2 } from './data';
import { useTheme } from './theme';
import {
  ChartScreen,
  TextDemos,
  invokeHaptic,
  useChartSize,
  useDemoStyles,
} from './ChartScreen';
import { ControlChip, ControlGroup, ControlSegmented } from './ChartControls';

const DATASETS = {
  '1': lineData,
  '2': lineData2,
  '3': gapLine,
  '1+2': [...lineData, ...lineData2],
  '2+1': [...lineData2, ...lineData],
  '2+1+2': [...lineData2, ...lineData, ...lineData2],
  'V Large': Array.from({ length: 6 }, () => [
    ...lineData2,
    ...lineData,
  ]).flat(),
};
type DatasetKey = keyof typeof DATASETS;
const DATASET_KEYS = Object.keys(DATASETS) as DatasetKey[];

const MULTI_DATA = { one: lineData, two: lineData2 };

const LINE_COLORS = {
  Blue: { light: '#1E6EF4', dark: '#0091FF' },
  Red: { light: '#E9152D', dark: '#FF4245' },
  Green: { light: '#008932', dark: '#30D158' },
  Orange: { light: '#FF8D28', dark: '#FF9230' },
};
type ColorName = keyof typeof LINE_COLORS;
const COLOR_NAMES = Object.keys(LINE_COLORS) as ColorName[];

const BACKGROUNDS = ['none', 'gradient', 'dots'] as const;
const Y_DOMAINS = ['auto', 'low', 'high'] as const;
const CURSOR_LINES = ['none', 'vertical', 'horizontal', 'both'] as const;
const TOOLTIPS = [
  'off',
  'top',
  'bottom',
  'left',
  'right',
] as const satisfies readonly ('off' | LineChartTooltipPosition)[];

/** Every boolean control, keyed by the label it shows. */
type Flag =
  | 'Multi Series'
  | 'Partial Day'
  | 'Scale to Time'
  | 'Min/Max Labels'
  | 'Highlight'
  | 'Markers'
  | 'Axis'
  | 'Snap to Point'
  | 'Persist on End'
  | 'Floating';

const MARKER_COUNT = 5;

function pickMarkers(length: number, count = MARKER_COUNT) {
  const picked = new Set<number>();
  while (picked.size < Math.min(count, length)) {
    picked.add(Math.floor(Math.random() * length));
  }
  return [...picked].sort((a, b) => a - b);
}

function summarise(points: readonly TLineChartPoint[]) {
  const values = points.map((point) => point.value);
  const stamps = points.map((point) => point.timestamp);
  const low = Math.min(...values);
  const high = Math.max(...values);

  return {
    low,
    high,
    lowIndex: values.indexOf(low),
    highIndex: values.indexOf(high),
    start: Math.min(...stamps),
    end: Math.max(...stamps),
    length: points.length,
  };
}

export default function LineChartScreen() {
  const { colors, theme } = useTheme();
  const demo = useDemoStyles();
  const size = useChartSize();

  const [dataset, setDataset] = useState<DatasetKey>('1');
  const [colorName, setColorName] = useState<ColorName>('Blue');
  const [background, setBackground] =
    useState<(typeof BACKGROUNDS)[number]>('gradient');
  const [yDomain, setYDomain] = useState<(typeof Y_DOMAINS)[number]>('auto');
  const [cursorLine, setCursorLine] =
    useState<(typeof CURSOR_LINES)[number]>('vertical');
  const [tooltipPosition, setTooltipPosition] =
    useState<(typeof TOOLTIPS)[number]>('top');
  const [cursorAt, setCursorAt] = useState<number>();
  const [flags, setFlags] = useState<Partial<Record<Flag, boolean>>>({});

  const [scrubbing, setScrubbing] = useState(false);

  const on = (flag: Flag) => !!flags[flag];
  const toggle = (flag: Flag) =>
    setFlags((prev) => ({ ...prev, [flag]: !prev[flag] }));
  const flagChips = (...names: Flag[]) =>
    names.map((name) => (
      <ControlChip
        key={name}
        label={name}
        selected={on(name)}
        onPress={() => toggle(name)}
      />
    ));

  /**
   * Each series — and each highlight, which sits one further along — steps one
   * along the palette, so neighbouring strokes stay distinguishable.
   */
  const seriesColor = (index: number) =>
    LINE_COLORS[
      COLOR_NAMES[
        (COLOR_NAMES.indexOf(colorName) + index) % COLOR_NAMES.length
      ]!
    ][theme];

  const multi = on('Multi Series');
  const data = DATASETS[dataset];

  const series = useMemo(
    () =>
      (multi
        ? [
            { id: 'one', ...summarise(MULTI_DATA.one) },
            { id: 'two', ...summarise(MULTI_DATA.two) },
          ]
        : [{ id: undefined, ...summarise(data) }]
      ).map((s) => ({ ...s, markers: pickMarkers(s.length) })),
    [data, multi]
  );

  const low = Math.min(...series.map((s) => s.low));
  const high = Math.max(...series.map((s) => s.high));
  const yMin = yDomain === 'low' ? low / 1.1 : undefined;
  const yMax = yDomain === 'high' ? high * 1.1 : undefined;

  const cursorLines = (['vertical', 'horizontal'] as const).filter(
    (orientation) => cursorLine === orientation || cursorLine === 'both'
  );

  const tooltip = tooltipPosition !== 'off' && (
    <LineChart.Tooltip
      position={tooltipPosition}
      withHorizontalFloating={on('Floating')}
      textStyle={demo.tooltipText}
    />
  );

  const chart = (
    <LineChart.Group>
      {series.map((s, index) => {
        const isLast = index === series.length - 1;
        const color = seriesColor(index);

        return (
          <LineChart
            key={s.id ?? 'single'}
            id={s.id}
            width={size}
            height={size}
          >
            <LineChart.Path color={color}>
              {background === 'gradient' && <LineChart.Gradient />}
              {background === 'dots' && <LineChart.DotGrid />}
              {on('Min/Max Labels') && (
                <>
                  <LineChart.Tooltip
                    position="top"
                    at={s.highIndex}
                    textStyle={demo.tooltipText}
                  />
                  <LineChart.Tooltip
                    position="bottom"
                    at={s.lowIndex}
                    yGutter={-10}
                    textStyle={demo.tooltipText}
                  />
                </>
              )}
              {on('Highlight') && (
                <LineChart.Highlight
                  color={seriesColor(index + 1)}
                  from={Math.floor(s.length / 3)}
                  to={Math.floor((s.length * 2) / 3)}
                />
              )}
              {on('Markers') &&
                s.markers.map((at, markerIndex) => {
                  const markerColor = seriesColor(index + markerIndex + 1);
                  return (
                    <LineChart.Dot
                      key={at}
                      at={at}
                      color={markerColor}
                      size={4}
                      hasOuterDot
                      outerSize={9}
                      dotProps={{
                        fill: colors.background,
                        stroke: markerColor,
                        strokeWidth: 2,
                      }}
                    />
                  );
                })}
            </LineChart.Path>
            {cursorLines.map((orientation) => (
              <LineChart.CursorLine
                key={orientation}
                orientation={orientation}
                showLabel
                textStyle={demo.tooltipText}
              />
            ))}
            <LineChart.CursorCrosshair
              snapToPoint={on('Snap to Point')}
              persistOnEnd={on('Persist on End')}
              at={cursorAt}
              color={index === 0 ? colors.text : color}
              onActivated={() => {
                invokeHaptic();
                setScrubbing(true);
              }}
              onEnded={() => {
                invokeHaptic();
                setScrubbing(false);
              }}
            >
              {tooltip}
              {isLast && <LineChart.HoverTrap />}
            </LineChart.CursorCrosshair>
            {on('Axis') && isLast && (
              <LineChart.Axis
                domain={[yMin ?? low, yMax ?? high]}
                hideOnInteraction
                labelPadding={0}
                position="right"
                orientation="vertical"
                color={colors.axis}
              />
            )}
          </LineChart>
        );
      })}
    </LineChart.Group>
  );

  // Omitted for multiple series: both text components read the active series,
  // which is ambiguous once the provider holds a dictionary.
  const readouts = multi ? null : (
    <TextDemos
      PriceText={LineChart.PriceText}
      DatetimeText={LineChart.DatetimeText}
    />
  );

  const controls = (
    <>
      <ControlGroup title="Data">
        <ControlSegmented
          options={DATASET_KEYS}
          value={dataset}
          onChange={setDataset}
        />
        {flagChips('Multi Series')}
      </ControlGroup>

      <ControlGroup title="Color">
        <ControlSegmented
          options={COLOR_NAMES}
          value={colorName}
          onChange={setColorName}
        />
      </ControlGroup>

      <ControlGroup title="Background">
        <ControlSegmented
          options={BACKGROUNDS}
          value={background}
          onChange={setBackground}
        />
      </ControlGroup>

      <ControlGroup title="Y Domain">
        <ControlSegmented
          options={Y_DOMAINS}
          value={yDomain}
          onChange={setYDomain}
        />
      </ControlGroup>

      <ControlGroup title="X Domain">
        {flagChips('Partial Day', 'Scale to Time')}
      </ControlGroup>

      <ControlGroup title="Appearance">
        {flagChips('Min/Max Labels', 'Highlight', 'Markers', 'Axis')}
      </ControlGroup>

      <ControlGroup title="Cursor">
        {flagChips('Snap to Point', 'Persist on End')}
        <ControlChip
          label="Set Cursor"
          onPress={() =>
            setCursorAt(Math.floor(Math.random() * series[0]!.length))
          }
        />
      </ControlGroup>

      <ControlGroup title="Cursor Line">
        <ControlSegmented
          options={CURSOR_LINES}
          value={cursorLine}
          onChange={setCursorLine}
        />
      </ControlGroup>

      <ControlGroup title="Tooltip">
        <ControlSegmented
          options={TOOLTIPS}
          value={tooltipPosition}
          onChange={setTooltipPosition}
        />
        {(tooltipPosition === 'left' || tooltipPosition === 'right') &&
          flagChips('Floating')}
      </ControlGroup>
    </>
  );

  const dataProp: TLineChartDataProp = multi ? MULTI_DATA : data;

  return (
    <LineChart.Provider
      xDomain={
        on('Scale to Time')
          ? [
              Math.min(...series.map((s) => s.start)),
              Math.max(...series.map((s) => s.end)),
            ]
          : undefined
      }
      xLength={
        on('Partial Day')
          ? Math.max(...series.map((s) => s.length)) * 2
          : undefined
      }
      yRange={
        yMin === undefined && yMax === undefined
          ? undefined
          : { min: yMin, max: yMax }
      }
      data={dataProp}
    >
      <ChartScreen
        chart={chart}
        readouts={readouts}
        controls={controls}
        scrubbing={scrubbing}
      />
    </LineChart.Provider>
  );
}
