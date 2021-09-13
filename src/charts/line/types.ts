import type Animated from 'react-native-reanimated';

export type TLineChartPoint = {
  timestamp: number;
  value: number;
};
export type TLineChartData = Array<TLineChartPoint>;
export type TLineChartDomain = [number, number];
export type TLineChartContext = {
  currentX: Animated.SharedValue<number>;
  currentY: Animated.SharedValue<number>;
  currentIndex: Animated.SharedValue<number>;
  data: TLineChartData;
  isActive: Animated.SharedValue<boolean>;
  domain: TLineChartDomain;
};
