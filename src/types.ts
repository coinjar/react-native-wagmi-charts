export type TData = Array<{
  date: String;
  open: number;
  high: number;
  low: number;
  close: number;
}>;

export type TContext = {
  data: TData;
  width: number;
  height: number;
  domain: number[];
  step: number;
  setHeight: (height: number) => void;
  setWidth: (width: number) => void;
};
