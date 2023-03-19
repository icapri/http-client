import { AugmentedError } from '../http/AugmentedError';

type Nullable<T> = T | null;
type Nullish<T> = T | null | undefined;
type PlainObject<T = any> = {
  [key: string]: T
}

export function createAugmentedError(request: XMLHttpRequest): AugmentedError {
  const rawHeaders = request.getAllResponseHeaders();
  const headers = rawHeaders.trim().split(/[\r\n]+/);
  const headerMap: any = {};
  if (request.readyState === request.HEADERS_RECEIVED) {
    headers.forEach((line) => {
      const parts = line.split(': ');
      const header = parts.shift();
      if (header) {
        const value = parts.join(': ');
        headerMap[header] = value;
      }
    });
  }

  return new AugmentedError({
    error: request.response,
    headers: headerMap,
    status: request.status,
    statusText: request.statusText,
    url: request.responseURL,
  });
}

export function isArray(value: any): value is any[] | readonly any[] {
  return Object.prototype.toString.call(value) === '[object Array]';
}

export function isBoolean(value: any): value is boolean {
  return typeof value === 'boolean';
}

export function isEmptyObject(value: any): value is Record<string, never> {
  const propsCount = Object.getOwnPropertyNames(value).length;
  const symbsCount = Object.getOwnPropertySymbols(value).length;
  return isObject(value) && propsCount === 0 && symbsCount === 0;
}

export function isNumber(value: any): value is number {
  return typeof value === 'number' && Number.isFinite(value) && !Number.isNaN(value);
}

export function isObject(value: any): value is object {
  return value !== null && typeof value === 'object';
}

export function isString(value: any): value is string {
  return typeof value === 'string';
}

export type { Nullable, Nullish, PlainObject };
