import React, { ReactNode, Children, cloneElement } from 'react';
import { ViewProps, View } from 'react-native';
import flattenChildren from 'react-keyed-flatten-children';

import { LineChart, LineChartProps } from './Chart';

type Props = {
  children: ReactNode;
} & ViewProps;

export function LineChartGroup({ children, ...props }: Props) {
  const flatChildren = flattenChildren(children);
  const flatChildrenCount = Children.count(flatChildren);
  return (
    <View {...props}>
      {Children.map(flatChildren, (child, index) => {
        const isLast = index === flatChildrenCount - 1;
        if (
          !isLast &&
          React.isValidElement(child) &&
          child.type === LineChart
        ) {
          return cloneElement(child, {
            absolute: true,
          } as Partial<LineChartProps>);
        }
        return child;
      })}
    </View>
  );
}
