import React from 'react';
import { ReactNode, Children, cloneElement } from 'react';
import { ViewProps, View } from 'react-native';
import flattenChildren from 'react-keyed-flatten-children';

import { LineChart } from './Chart';

type Props = {
  children: ReactNode;
} & ViewProps;

export function LineChartGroup({ children, ...props }: Props) {
  const flatChildren = flattenChildren(children);
  const flatChildrenCount = Children.count(flatChildren);
  return (
    <View {...props}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {Children.map(flatChildren, (child: any, index) => {
        const isLast = index === flatChildrenCount - 1;
        if (!isLast && child.type === LineChart) {
          return cloneElement(child, {
            absolute: true,
          });
        }
        return child;
      })}
    </View>
  );
}
