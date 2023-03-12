import { AugmentedError } from '../http/AugmentedError';

type Nullable<T> = T | null;
type Nullish<T> = T | null | undefined;

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

export type { Nullable, Nullish };
