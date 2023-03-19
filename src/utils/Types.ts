type Nullable<T> = T | null;
type Nullish<T> = T | null | undefined;
type PlainObject<T = any> = {
  [key: string]: T
}

export type { Nullable, Nullish, PlainObject };
