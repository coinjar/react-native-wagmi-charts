import * as React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import type { TextProps } from 'react-native';
import type { AnimatedProps } from 'react-native-reanimated';
import type { TFormatterFn } from 'react-native-wagmi-charts';
import * as haptics from 'expo-haptics';

import type { ThemeColors } from './theme';
import { useThemedStyles } from './theme';

const WIDE_BREAKPOINT = 768;
const DETAILS_COLUMN_WIDTH = 420;
const COLUMN_GAP = 40;
const MAX_CHART_SIZE = 800;

const IS_MOBILE = Platform.OS === 'ios' || Platform.OS === 'android';

export function invokeHaptic() {
  if (IS_MOBILE) {
    haptics.impactAsync(haptics.ImpactFeedbackStyle.Light).catch(() => {});
  }
}

export function useChartSize() {
  const { width } = useWindowDimensions();

  return width >= WIDE_BREAKPOINT
    ? Math.min(width - DETAILS_COLUMN_WIDTH - COLUMN_GAP, MAX_CHART_SIZE)
    : width;
}

export type ChartScreenProps = {
  chart: React.ReactNode;
  readouts: React.ReactNode;
  controls: React.ReactNode;
  scrubbing: boolean;
};

/**
 * Layout the chart above its details on small screens, and side by side once
 * there is room.
 */
export function ChartScreen({
  chart,
  readouts,
  controls,
  scrubbing,
}: ChartScreenProps) {
  const { width } = useWindowDimensions();
  const isWide = width >= WIDE_BREAKPOINT;
  const demo = useDemoStyles();

  // Only a narrow phone lacks the room for both, and there the readouts take the
  // controls' place for as long as the touch lasts. Anywhere else shows both.
  const swap = IS_MOBILE && !isWide;
  const showReadouts = !!readouts && (!swap || scrubbing);
  const showControls = !swap || !showReadouts;
  const card = isWide && demo.card;

  return (
    <View style={isWide && layout.wide}>
      <View style={layout.chartColumn}>{chart}</View>
      <View style={[layout.detailsColumn, isWide && layout.detailsColumnWide]}>
        {showControls && (
          <View style={card}>
            <View style={demo.section}>
              <Text style={demo.sectionTitle}>Controls</Text>
              <View style={demo.controls}>{controls}</View>
            </View>
          </View>
        )}
        {showReadouts && (
          <View style={[card, !card && showControls && demo.divider]}>
            {readouts}
          </View>
        )}
      </View>
    </View>
  );
}

/** Styles for the labelled value readouts below/beside a chart. */
export function useDemoStyles() {
  return useThemedStyles(createDemoStyles);
}

function DemoRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const demo = useDemoStyles();

  return (
    <View style={demo.row}>
      <Text style={demo.label}>{label}: </Text>
      {children}
    </View>
  );
}

/** Shared by both `DatetimeText` demos. */
const DATETIME_FORMAT = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
} as const;

function formatAud(d: { formatted: string }) {
  'worklet';
  return d.formatted ? `$${d.formatted} AUD` : '';
}

type TextDemosProps = {
  PriceText: React.ComponentType<{
    variant?: 'value';
    format?: TFormatterFn<string>;
    style?: AnimatedProps<TextProps>['style'];
  }>;
  DatetimeText: React.ComponentType<{
    variant?: 'value';
    locale?: string;
    options?: Intl.DateTimeFormatOptions & Record<string, string>;
    style?: AnimatedProps<TextProps>['style'];
  }>;
  children?: React.ReactNode;
};

/** The `PriceText`/`DatetimeText` sections */
export function TextDemos({
  PriceText,
  DatetimeText,
  children,
}: TextDemosProps) {
  const demo = useDemoStyles();

  return (
    <>
      <View style={demo.section}>
        <Text style={demo.sectionTitle}>PriceText</Text>
        <DemoRow label="Formatted">
          <PriceText style={demo.value} />
        </DemoRow>
        <DemoRow label="Value">
          <PriceText variant="value" style={demo.value} />
        </DemoRow>
        <DemoRow label="Custom format">
          <PriceText style={demo.value} format={formatAud} />
        </DemoRow>
        {children}
      </View>

      <View style={[demo.section, demo.divider]}>
        <Text style={demo.sectionTitle}>DatetimeText</Text>
        <DemoRow label="Formatted">
          <DatetimeText style={demo.value} />
        </DemoRow>
        <DemoRow label="Value">
          <DatetimeText variant="value" style={demo.value} />
        </DemoRow>
        <DemoRow label="Custom format">
          <DatetimeText
            style={demo.value}
            locale="en-AU"
            options={DATETIME_FORMAT}
          />
        </DemoRow>
      </View>
    </>
  );
}

const layout = StyleSheet.create({
  wide: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: COLUMN_GAP,
  },
  chartColumn: {
    flexShrink: 0,
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 16,
  },
  detailsColumn: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  detailsColumnWide: {
    flexShrink: 1,
    maxWidth: DETAILS_COLUMN_WIDTH,
    paddingHorizontal: 0,
    paddingTop: 8,
    paddingBottom: 24,
    gap: 16,
  },
});

const createDemoStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      backgroundColor: colors.surface,
    },
    section: {
      paddingVertical: 16,
      gap: 6,
    },
    divider: {
      borderTopWidth: 1,
      borderTopColor: colors.divider,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 4,
      color: colors.text,
    },
    controls: {
      marginTop: 6,
      gap: 14,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'baseline',
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.text,
    },
    value: {
      flex: 1,
      color: colors.text,
      // AnimatedText renders a TextInput, and Android gives those generous
      // vertical padding plus font padding, which inflates every row.
      ...Platform.select({
        android: {
          paddingVertical: 0,
          includeFontPadding: false,
          textAlignVertical: 'center' as const,
        },
      }),
    },
    tooltip: {
      backgroundColor: colors.surface,
      borderRadius: 4,
    },
    tooltipText: {
      color: colors.text,
    },
    priceRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    priceColumn: {
      flex: 1,
    },
    priceLabel: {
      fontSize: 10,
      marginBottom: 4,
      color: colors.mutedText,
    },
  });
