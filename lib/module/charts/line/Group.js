import React from 'react';
import { Children, cloneElement } from 'react';
import { View } from 'react-native';
import flattenChildren from 'react-keyed-flatten-children';
import { LineChart } from './Chart';
export function LineChartGroup({
  children,
  ...props
}) {
  const flatChildren = flattenChildren(children);
  const flatChildrenCount = Children.count(flatChildren);
  return /*#__PURE__*/React.createElement(View, props, Children.map(flatChildren, (child, index) => {
    const isLast = index === flatChildrenCount - 1;

    if (!isLast && child.type === LineChart) {
      return /*#__PURE__*/cloneElement(child, {
        absolute: true
      });
    }

    return child;
  }));
}
//# sourceMappingURL=Group.js.map