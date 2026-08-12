import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

import type { ThemeColors } from './theme';
import { useThemedStyles } from './theme';

/** A labelled, wrapping row of controls. */
export function ControlGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.group}>
      <Text style={styles.groupTitle}>{title}</Text>
      {children}
    </View>
  );
}

type ControlChipProps = {
  label: string;
  onPress: () => void;
  /** Omit on chips that fire an action rather than represent a selection. */
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function ControlChip({
  label,
  onPress,
  selected,
  style,
}: ControlChipProps) {
  const styles = useThemedStyles(createStyles);

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={
        typeof selected === 'boolean' ? { selected } : undefined
      }
      activeOpacity={0.7}
      style={[styles.chip, selected && styles.chipFilled, style]}
      onPress={onPress}
    >
      <Text style={[styles.chipText, selected && styles.chipTextFilled]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

/** Joined row of mutually exclusive chips, labelled by their own values. */
export function ControlSegmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
}) {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.segmented}>
      {options.map((option) => (
        <ControlChip
          key={option}
          label={option.charAt(0).toUpperCase() + option.slice(1)}
          selected={option === value}
          onPress={() => onChange(option)}
          style={styles.segment}
        />
      ))}
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    group: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: 6,
    },
    groupTitle: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.text,
    },
    segmented: {
      alignSelf: 'flex-start',
      flexDirection: 'row',
      flexWrap: 'wrap',
      maxWidth: '100%',
      gap: 1,
      backgroundColor: colors.border,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      overflow: 'hidden',
    },
    segment: {
      borderWidth: 0,
      borderRadius: 0,
    },
    chip: {
      minHeight: 36,
      justifyContent: 'center',
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      backgroundColor: colors.background,
    },
    chipFilled: {
      borderColor: colors.primary,
      backgroundColor: colors.primary,
    },
    chipText: {
      fontSize: 13,
      fontWeight: '500',
      color: colors.mutedText,
    },
    chipTextFilled: {
      color: 'white',
    },
  });
