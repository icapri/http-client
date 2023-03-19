import { Validator } from '../utils';
import { AugmentedError } from './AugmentedError';
import { HttpHeaders } from './HttpHeaders';
import { HttpParams } from './HttpParams';
import { HttpRequestOptions } from './HttpRequestOptions';

export abstract class HttpHelper {
  protected static buildParams(params: HttpParams): string {
    return Object.entries(params).map(([key, value]) => {
      const encodedKey = encodeURIComponent(key);
      let encodedVal: string | undefined;
      if (Validator.isArray(value)) {
        encodedVal = value.map(v => encodeURIComponent(v)).join(',');
      } else {
        encodedVal = encodeURIComponent(value);
      }

      return `${encodedKey}=${encodedVal}`;
    }).join('&');
  }

  protected static createAugmentedError(request: XMLHttpRequest): AugmentedError {
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

  protected static openRequest(
    url: string,
    request: XMLHttpRequest,
    options: HttpRequestOptions
  ): void {
    request.open(
      options.method,
      url,
      true,
      options.credentials?.username,
      options.credentials?.password
    );
  }

  protected static setOptions(request: XMLHttpRequest, options: HttpRequestOptions): void {
    request.withCredentials = options.withCredentials || false;
    const timeout = options.timeout;
    if (timeout) {
      request.timeout = timeout;
    }

    if (options.headers) {
      HttpHelper.setHeaders(request, options.headers);
    }

    const responseType = options.responseType;
    request.responseType = responseType || 'json';
  }

  private static setHeaders(request: XMLHttpRequest, headers: HttpHeaders): void {
    Object
      .entries(headers)
      .forEach(([key, value]) => request.setRequestHeader(key, value));
  }
}
