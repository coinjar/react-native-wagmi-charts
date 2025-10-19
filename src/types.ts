export type TFormatterFn<T> = ({
  value,
  formatted,
}: {
  value: T;
  formatted: string;
}) => string;
