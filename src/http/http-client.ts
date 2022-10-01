import {GET} from './http-decorators';
import {
  HttpDeleteOptions,
  HttpGetOptions,
  HttpOptions,
  HttpPostOptions,
  HttpPutOptions,
} from './http-options';

/**
 * Provides an injectable service for performing HTTP requests using the
 * [`fetch API`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
 * in the background.
 */
export class HttpClient {
  /**
   * Contains the controller object that allows to abort one or more
   * DOM requests as and when desired.
   */
  private readonly controller = new AbortController();

  /**
   * Contains a signal object that enables the communication with a
   * DOM request (such as a Fetch) and abort it if required via an
   * `AbortController` object.
   */
  private readonly signal: AbortSignal = this.controller.signal;

  /**
   * Contains the list of experimental HTTP request headers.
   */
  private static readonly experimentalHeaders: ReadonlyArray<string> = [
    'Device-Memory',
    'Downlink',
    'Early-Data',
    'ECT',
    'NEL',
    'RTT',
    'Save-Data',
    'Sec-CH-UA',
    'Sec-CH-UA-Arch',
    'Sec-CH-UA-Bitness',
    'Sec-CH-UA-Full-Version-List',
    'Sec-CH-UA-Mobile',
    'Sec-CH-UA-Model',
    'Sec-CH-UA-Platform',
    'Sec-CH-UA-Platform-Version',
    'Sec-GPC',
    'X-DNS-Prefetch-Control',
    'X-Forwarded-For',
    'X-Forwarded-Host',
    'X-Forwarded-Proto',
    'X-XSS-Protection',
  ];

  /**
   * Contains the list of deprecated HTTP request headers.
   */
  private static readonly deprecatedHeaders: ReadonlyArray<string> = [
    'Accept-CH-Lifetime',
    'Content-DPR',
    'DNT',
    'DPR',
    'Large-Allocation',
    'Pragma',
    'Sec-CH-UA-Full-Version',
    'Tk',
    'Viewport-Width',
    'Warning',
    'Width',
  ];

  /**
   * @see `HttpClient.cancel()`
   */
  abort(): void {
    this.cancel();
  }

  /**
   * Sets the AbortSignal's `aborted` flag and signal to any observers
   * that the associated activity is to be aborted.
   */
  cancel(): void {
    // abort the current request
    this.controller.abort('HTTP request was cancelled!');

    // show an optional information in the console
    console.info('HTTP request was cancelled!');
  }

  /**
   * Sends an HTTP request to the server.
   *
   * @param {String} uri Contains the uri of the resource to be requested.
   * @param {HttpOptions} options Contains the custom settings applied to
   * the request.
   * @return {Promise} the HTTP response given by the server.
   */
  private async request<T>(
      uri: string,
      options?: HttpOptions,
  ): Promise<T> {
    // add the aborting signalizer to the HTTP request settings
    const requestOptions: HttpOptions = {
      ...options,
      signal: this.signal,
    };

    const headers = requestOptions.headers;
    if (headers) {
      const keys = Object.keys(headers);
      const deprecated = keys
          .filter((key: string) => HttpClient.deprecatedHeaders.includes(key));
      console.warn(`'${
        deprecated.join('\', ')
      }' ${
        deprecated.length > 1 ? 'are' : 'is'
      } deprecated HTTP request headers.`);

      const experimental = keys
          .filter((key) => HttpClient.experimentalHeaders.includes(key));
      console.warn(`'${
        experimental.join('\', ')
      }' ${
        experimental.length > 1 ? 'are' : 'is'
      } experimental HTTP request headers.`);
    }

    try {
      // here the function waits for the settlement of the `fetch()` method,
      // the call of which will either return a `Response` or throw an error
      const response = await fetch(uri, requestOptions);
      if (!response.ok) {
        throw new Error(
            `HTTP Error ${response.status}: ${response.statusText}`,
        );
      }

      // here the function will wait once again for the settlement of the
      // `response.json()`, this call will also either return a `Response`
      // or throw an error which is caught down in the `catch` block
      return await response.json();
    } catch (error) {
      // here the error is stringified and then thrown
      throw new Error(String(error));
    }
  }

  /**
   * Sends an HTTP Delete request to the server.
   *
   * @param {String} uri Contains the uri of the resource to be deleted.
   * @param {HttpDeleteOptions} options Contains the custom settings applied
   * to the request.
   * @return {Promise<T>} the deleted object.
   */
  async delete<T>(
      uri: string,
      options?: HttpDeleteOptions,
  ): Promise<T> {
    const requestOptions: HttpOptions = {
      ...options,
      method: 'DELETE',
    };

    return await this.request(uri, requestOptions);
  }

  /**
   * Sends an HTTP Get request to the server.
   *
   * @param {String} uri Contains the uri of the resource to be gotten.
   * @param {HttpGetOptions} options Contains the custom settings applied
   * to the GET request.
   * @return {Promise<T>} the object gotten.
   */
  @GET
  async get<T>(
      uri: string,
      options?: HttpGetOptions,
  ): Promise<T> {
    const requestOptions: HttpOptions = {
      ...options,
      method: 'GET',
    };

    return await this.request(uri, requestOptions);
  }

  /**
   * Sends an HTTP Post request to the server.
   *
   * @param {String} uri Contains the uri of the resource to be posted.
   * @param {*} body Contains the body of the POST request.
   * @param {HttpPostOptions} options Contains the custom settings applied to
   * the POST request.
   * @return {Promise<T>} the object posted to the server.
   */
  async post<T>(
    uri: string,
    body: any | null,
    options?: HttpPostOptions
  ): Promise<T>;
  /**
   * Sends an HTTP Post request to the server.
   *
   * @param {String} uri Contains the uri of the resource to be posted.
   * @param {*} body Contains the body of the POST request.
   * @param {HttpPostOptions} options Contains the custom settings applied to
   * the POST request.
   * @return {Promise<T>} the object posted to the server.
   */
  async post<T>(
      uri: string,
      body: T extends undefined ? never : T | any | null,
      options?: HttpPostOptions,
  ): Promise<T> {
    const requestOptions: HttpOptions = {
      ...options,
      method: 'POST',
      body,
    };

    return await this.request(uri, requestOptions);
  }

  /**
   * Sends an HTTP Put request to the server.
   *
   * @param {String} uri Contains the uri of the resource to be replaced.
   * @param {*} body Contains the body of the PUT request.
   * @param {HttpPutOptions} options Contains the custom settings applied to
   * the PUT request.
   * @return {Promise<T>} the object which was replaced.
   */
  async put<T>(
    uri: string,
    body: any | null,
    options?: HttpPutOptions
  ): Promise<T>;
  /**
   * Sends an HTTP Put request to the server.
   *
   * @param {String} uri Contains the uri of the resource to be replaced.
   * @param {*} body Contains the body of the PUT request.
   * @param {HttpPutOptions} options Contains the custom settings applied to
   * the PUT request.
   * @return {Promise<T>} the object which was replaced.
   */
  async put<T>(
      uri: string,
      body: T extends undefined ? never : T | any | null,
      options?: HttpPutOptions,
  ): Promise<T> {
    const requestOptions: HttpOptions = {
      ...options,
      method: 'PUT',
      body,
    };

    return await this.request(uri, requestOptions);
  }
}
