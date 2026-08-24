import {
  Children,
  Fragment,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';

/**
 * `Children.toArray`, with fragments flattened into the result and keys kept
 * unique across nesting levels.
 *
 * This replaces `react-keyed-flatten-children`, which recognises fragments
 * through `react-is@16`. React 19 renamed the symbol it tags elements with
 * (`react.element` to `react.transitional.element`), so every check in that
 * version returns `false`, fragments come back unflattened, and any consumer
 * sorting children by display name silently drops their contents. Comparing
 * `type` against the `Fragment` we imported sidesteps the whole problem: it is
 * whatever the React actually rendering the tree uses.
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
