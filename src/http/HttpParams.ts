type ParamType =
  | string
  | number
  | boolean
  | readonly (string | number | boolean)[];

type HttpParams = {
  [key: string]: ParamType;
}

export type { HttpParams };
