export function getDomain(rows) {
  'worklet';

  const values = rows.map(({
    value
  }) => value);
  return [Math.min(...values), Math.max(...values)];
}
//# sourceMappingURL=getDomain.js.map