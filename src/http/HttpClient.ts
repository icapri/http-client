import { createAugmentedError } from '../utils';
import { AbortionError } from './AbortionError';
import { AugmentedError } from './AugmentedError';
import { HttpRequestBody } from './HttpRequestBody';
import {
  HttpDeleteOptions,
  HttpGetOptions,
  HttpHeadOptions,
  HttpOptionsOptions,
  HttpPatchOptions,
  HttpPostOptions,
  HttpPutOptions,
  HttpRequestOptions,
} from './HttpRequestOptions';

export class HttpClient {
  private static readonly DONE_STATE: number = 4;

  async delete<T extends any>(url: string | URL, options?: HttpDeleteOptions): Promise<T> {
    const o: HttpRequestOptions = { ...options, method: 'DELETE' };
    return await this.request<T>(url, o);
  }

  async get<T extends any | any[] = never>(url: string | URL, options?: HttpGetOptions): Promise<T> {
    const o: HttpRequestOptions = { ...options, method: 'GET' };
    return await this.request<T>(url, o);
  }

  async head<T extends any = never>(url: string | URL, options?: HttpHeadOptions): Promise<T> {
    const o: HttpRequestOptions = { ...options, method: 'HEAD' };
    return await this.request(url, o);
  }

  async options<T extends any = never>(url: string | URL, options?: HttpOptionsOptions): Promise<T> {
    const o: HttpRequestOptions = { ...options, method: 'OPTIONS' };
    return await this.request(url, o);
  }

  async patch<T extends any = never>(
    url: string | URL,
    body?: HttpRequestBody,
    options?: HttpPatchOptions
  ): Promise<T> {
    const o: HttpRequestOptions = { ...options, method: 'PATCH', body };
    return await this.request(url, o);
  }

  async post<T extends any>(
    url: string | URL,
    body?: HttpRequestBody,
    options?: HttpPostOptions
  ): Promise<T> {
    const o: HttpRequestOptions = { ...options, method: 'POST', body };
    return await this.request(url, o);
  }

  async put<T extends any>(
    url: string | URL,
    body?: HttpRequestBody,
    options?: HttpPutOptions
  ): Promise<T> {
    const o: HttpRequestOptions = { ...options, method: 'PUT', body };
    return await this.request(url, o);
  }

  private async request<T>(url: string | URL, options: HttpRequestOptions): Promise<T> {
    return new Promise<T>(function (resolve, reject: (reason?: AugmentedError) => void) {
      // stringify the URL for different usage cases
      const _url = typeof url === 'string' ? url : url.toString();
      if (options.signal && options.signal.aborted) {
        return reject(new AbortionError({ url: _url }));
      }
      const request = new XMLHttpRequest();
      request.open(
        options.method,
        url,
        true,
        options.credentials?.username,
        options.credentials?.password
      );
      request.onload = function () {
        if (request.status >= 200 && request.status < 300) {
          resolve(request.response);
        } else {
          request.abort();
          reject(createAugmentedError(request));
        }
      };
      request.onerror = function () {
        reject(createAugmentedError(request));
      };
      if (options.headers) {
        Object
          .entries(options.headers)
          .forEach(([key, value]) => request.setRequestHeader(key, value));
      }
      request.onabort = function() {
        reject(new AbortionError({ url: _url }));
      };

      function abortListener() {
        request.abort();
      }

      function progressListener(e: ProgressEvent<EventTarget>) {
        console.log('%cINFO: ', 'color: #007acc;', `${e.loaded} bytes transferred...`);
      }

      if (options.reportProgress) {
        request.addEventListener('progress', progressListener);
      }

      options.signal?.addEventListener('aborted', abortListener);
      request.onreadystatechange = function() {
        if (request.readyState === HttpClient.DONE_STATE) {
          options.signal?.removeEventListener('aborted', abortListener);
          if (options.reportProgress) {
            request.removeEventListener('progress', progressListener);
          }
        }
      };

      request.withCredentials = options.withCredentials || false;
      const timeout = options.timeout;
      if (timeout) {
        request.timeout = timeout;
      }

      request.ontimeout = function () {
        reject(createAugmentedError(request));
      };
      const responseType = options.responseType;
      request.responseType = responseType || 'json';
      const body = options.body;
      if (body && !['GET', 'HEAD'].includes(options.method)) {
        request.send(body);
      } else {
        request.send();
      }
    });
  }
}
