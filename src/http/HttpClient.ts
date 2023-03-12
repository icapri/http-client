import { createAugmentedError } from '../utils';
import { AugmentedError } from './AugmentedError';
import { HttpRequestBody } from './HttpRequestBody';
import { HttpRequestOptions } from './HttpRequestOptions';

export class HttpClient {
  private lastRequest?: XMLHttpRequest;

  private readonly requests: XMLHttpRequest[] = [];

  abort(): void {
    this.lastRequest?.abort();
  }

  async delete<T extends any>(url: string | URL, options?: HttpRequestOptions): Promise<T> {
    options ||= { method: 'DELETE' };
    return await this.request<T>(url, options);
  }

  async get<T extends any | any[] = never>(url: string | URL, options?: HttpRequestOptions): Promise<T> {
    options ||= { method: 'GET' };
    return await this.request<T>(url, options);
  }

  async head<T extends any = never>(url: string | URL, options?: HttpRequestOptions): Promise<T> {
    options ||= { method: 'HEAD' };
    return await this.request(url, options);
  }

  async options<T extends any = never>(url: string | URL, options?: HttpRequestOptions): Promise<T> {
    options ||= { method: 'OPTIONS' };
    return await this.request(url, options);
  }

  async patch<T extends any = never>(
    url: string | URL,
    body?: HttpRequestBody,
    options?: HttpRequestOptions
  ): Promise<T> {
    options ||= { method: 'PATCH' };
    options.body = body;
    return await this.request(url, options);
  }

  async post<T extends any>(
    url: string | URL,
    body?: HttpRequestBody,
    options?: HttpRequestOptions,
  ): Promise<T> {
    options ||= { method: 'POST' };
    options.body = body;
    return await this.request(url, options);
  }

  async put<T extends any>(
    url: string | URL,
    body?: HttpRequestBody,
    options?: HttpRequestOptions,
  ): Promise<T> {
    options ||= { method: 'PUT' };
    options.body = body;
    return await this.request(url, options);
  }

  private async request<T>(url: string | URL, options: HttpRequestOptions): Promise<T> {
    const request = new XMLHttpRequest();
    this.requests.push(request);
    this.lastRequest = request;
    return new Promise<T>(function (resolve, reject: (reason?: AugmentedError) => void) {
      request.open(options.method, url, true);
      request.onload = function () {
        if (request.status >= 200 && request.status < 300) {
          resolve(request.response);
        } else {
          request.abort();
          reject(createAugmentedError(request));
        }
      };
      request.onerror = function () {
        request.abort();
        reject(createAugmentedError(request));
      };
      if (options.headers) {
        Object
          .entries(options.headers)
          .forEach(([key, value]) => request.setRequestHeader(key, value));
      }

      request.withCredentials = options.withCredentials || false;
      const timeout = options.timeout;
      if (timeout) {
        request.timeout = timeout;
      }

      request.ontimeout = function () {
        request.abort();
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
