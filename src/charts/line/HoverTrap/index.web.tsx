import React from 'react';
import { View, StyleSheet } from 'react-native';

import { LineChartDimensionsContext } from '../Chart';
import { useLineChart } from '../useLineChart';

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

/**
 * Minimum time in milliseconds that must pass between touch events before a
 * hover state is activated on web.
 */
const HOVER_THRESHOLD_MS = 1000;

/**
 * Hover state manager for web platform. This singleton ensures global hover
 * detection is properly initialized and cleaned up.
 */
class HoverStateManager {
  private isEnabled = false;
  private lastTouchTimestamp = 0;
  private initialized = false;

  constructor() {
    if (canUseDOM) {
      this.initialize();
    }
  }

  private initialize() {
    if (this.initialized) return;

    /**
     * The following logic comes from the creator of react-native-web:
     * https://gist.github.com/necolas/1c494e44e23eb7f8c5864a2fac66299a
     * It's also used by MotiPressable's hover interactions:
     * https://github.com/nandorojo/moti/blob/master/packages/interactions/src/pressable/hoverable.tsx
     *
     * Web browsers emulate mouse events (and hover states) after touch events.
     * This code infers when the currently-in-use modality supports hover
     * (including for multi-modality devices) and considers "hover" to be enabled
     * if a mouse movement occurs more than 1 second after the last touch event.
     * This threshold is long enough to account for longer delays between the
     * browser firing touch and mouse events on low-powered devices.
     */
    document.addEventListener('touchstart', this.disableHover, true);
    document.addEventListener('touchmove', this.disableHover, true);
    document.addEventListener('mousemove', this.enableHover, true);
    this.initialized = true;
  }

  private enableHover = () => {
    if (
      this.isEnabled ||
      Date.now() - this.lastTouchTimestamp < HOVER_THRESHOLD_MS
    ) {
      return;
    }
    this.isEnabled = true;
  };

  private disableHover = () => {
    this.lastTouchTimestamp = Date.now();
    if (this.isEnabled) {
      this.isEnabled = false;
    }
  };

  public isHoverEnabled(): boolean {
    return this.isEnabled;
  }

  /**
   * Cleanup method for removing event listeners. Note: In practice, this may
   * never be called since these are app-level listeners, but it's provided for
   * completeness and testing purposes.
   */
  public cleanup() {
    if (!this.initialized || !canUseDOM) return;
    document.removeEventListener('touchstart', this.disableHover, true);
    document.removeEventListener('touchmove', this.disableHover, true);
    document.removeEventListener('mousemove', this.enableHover, true);
    this.initialized = false;
  }
}

// Singleton instance
const hoverStateManager = new HoverStateManager();

export const LineChartHoverTrap = () => {
  const { width, parsedPath } = React.useContext(LineChartDimensionsContext);
  const { currentX, currentIndex, isActive, data } = useLineChart();

  const onMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!hoverStateManager.isHoverEnabled()) {
        isActive.value = false;
        currentIndex.value = -1;
        return;
      }

      if (!parsedPath) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const boundedX = Math.min(e.clientX - rect.left, width);
      isActive.value = true;
      currentX.value = boundedX;

      // on Web, we could drag the cursor to be negative, breaking it
      // so we clamp the index at 0 to fix it
      // https://github.com/coinjar/react-native-wagmi-charts/issues/24
      const minIndex = 0;
      const boundedIndex = Math.max(
        minIndex,
        Math.round(boundedX / width / (1 / (data ? data.length - 1 : 1)))
      );

      currentIndex.value = boundedIndex;
    },
    [currentIndex, currentX, data, isActive, parsedPath, width]
  );

  const onMouseLeave = React.useCallback(() => {
    isActive.value = false;
    currentIndex.value = -1;
  }, [currentIndex, isActive]);

  return (
    <View
      style={StyleSheet.absoluteFill}
      // @ts-expect-error mouse move event
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    />
  );
};
