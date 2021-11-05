import React from 'react';

/* Returns React children into an array, flattening fragments.

Forked from https://github.com/grrowl/react-keyed-flatten-children/blob/master/index.ts
*/
import {
  ReactNode,
  ReactChild,
  Children,
  isValidElement,
  cloneElement,
} from 'react';
import { ViewProps, View } from 'react-native';
import { LineChart } from './Chart';

export default function flattenChildren(
  children: ReactNode,
  depth: number = 0,
  keys: (string | number)[] = []
): ReactChild[] {
  return Children.toArray(children).reduce( 
    // eslint-disable-next-line
    (acc: ReactChild[], node: any, nodeIndex) => {
      if (node.type === React.Fragment) {
        acc.push.apply(
          acc,
          flattenChildren(
            node.props.children,
            depth + 1,
            keys.concat(node.key || nodeIndex)
          )
        );
      } else {
        if (isValidElement(node)) {
          acc.push(
            cloneElement(node, {
              key: keys.concat(String(node.key)).join('.'),
            })
          );
        } else if (typeof node === 'string' || typeof node === 'number') {
          acc.push(node);
        }
      }
      return acc;
    },
    []
  );
}

type Props = {
  children: ReactNode;
} & ViewProps;

export function LineChartGroup({ children, ...props }: Props) {
  const flatChildren = flattenChildren(children);
  const flatChildrenCount = Children.count(flatChildren);
  return (
    <View {...props}>
      {/* eslint-disable-next-line */}
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
