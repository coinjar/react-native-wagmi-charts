import {
  Children,
  Fragment,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';

/**
 * `Children.toArray`, with fragments flattened and keys kept unique across
 * nesting levels.
 */
export function flattenChildren(
  children: ReactNode,
  depth = 0,
  keys: (string | number)[] = []
): ReactNode[] {
  return Children.toArray(children).reduce<ReactNode[]>(
    (acc, node, nodeIndex) => {
      if (isValidElement(node) && node.type === Fragment) {
        acc.push(
          ...flattenChildren(
            (node.props as { children?: ReactNode }).children,
            depth + 1,
            keys.concat(node.key ?? nodeIndex)
          )
        );
      } else if (isValidElement(node)) {
        acc.push(
          cloneElement(node as ReactElement, {
            key: keys.concat(String(node.key)).join('.'),
          })
        );
      } else if (typeof node === 'string' || typeof node === 'number') {
        acc.push(node);
      }
      return acc;
    },
    []
  );
}
