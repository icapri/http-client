import { Validator } from '../utils';
import { AbortionError } from './AbortionError';
import { AugmentedError } from './AugmentedError';
import { HttpHelper } from './HttpHelper';
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

export class HttpClient extends HttpHelper {
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

  private async request<T>(requestUrl: string | URL, options: HttpRequestOptions): Promise<T> {
    // stringify the URL for different usage cases
    let url = Validator.isString(requestUrl) ? requestUrl : requestUrl.toString();
    if (options.params && !Validator.isEmptyObject(options.params)) {
      const params = '?'.concat(HttpHelper.buildParams(options.params));
      url = url.concat(params);
    }

    return new Promise<T>(function (resolve, reject: (reason?: AugmentedError) => void) {
      if (options.signal && options.signal.aborted) {
        reject(new AbortionError({ url }));
      }

      const request = new XMLHttpRequest();
      HttpHelper.openRequest(url, request, options);
      request.onload = function () {
        const isDone = request.readyState === HttpClient.DONE_STATE;
        const isOkay = request.status >= 200 && request.status < 300;
        if (isDone && isOkay) {
          resolve(request.response);
        } else {
          reject(HttpHelper.createAugmentedError(request));
        }
      };

      request.onerror = function () {
        reject(HttpHelper.createAugmentedError(request));
      };

      request.onabort = function() {
        reject(new AbortionError({ url }));
      };

      function abortListener() {
        request.abort();
      }

      function progressListener(e: ProgressEvent<EventTarget>) {
        console.log('%cINFO: ', 'color: #007acc;', `${e.loaded} bytes transferred...`);
      }

      HttpHelper.setOptions(request, options);

      if (options.logProgress) {
        request.addEventListener('progress', progressListener);
      }

      options.signal?.addEventListener('aborted', abortListener);
      request.onreadystatechange = function() {
        if (request.readyState === HttpClient.DONE_STATE) {
          options.signal?.removeEventListener('aborted', abortListener);
          if (options.logProgress) {
            request.removeEventListener('progress', progressListener);
          }
        }
      };

      request.ontimeout = function () {
        reject(HttpHelper.createAugmentedError(request));
      };

      const body = options.body;
      if (body && !['GET', 'HEAD'].includes(options.method)) {
        request.send(body);
      } else {
        request.send();
      }
    });
  }
}
