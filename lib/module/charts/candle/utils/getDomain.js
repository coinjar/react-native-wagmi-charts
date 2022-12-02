export function getDomain(rows) {
  'worklet';

  const values = rows.map(({
    high,
    low
  }) => [high, low]).flat();
  const min = Math.min(...values);
  const max = Math.max(...values);
  return [min - (max - min) * 0.025, max + (max - min) * 0.025];
}
//# sourceMappingURL=getDomain.js.map