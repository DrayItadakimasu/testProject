export interface IOption {
  id: number;
  title: string;
  extra?: Record<string, unknown>;
}

export type ValueType = string | number | IOption;
export type OptionsType = string[] | number[] | IOption[];
