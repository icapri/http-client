import {HttpMethod} from './enums/http-method';
import {
  HttpDeleteOptions,
  HttpGetOptions,
  HttpOptions,
  HttpPostOptions,
  HttpPutOptions,
} from './interfaces/http-options';

/**
 * Represents the simplest type of object of the JavaScript language.
 */
export type PlainObject<T = any> = {
  [key: string]: T
};

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
   * @see `HttpClient.cancel()`
   */
  public abort(): void {
    this.cancel();
  }

  /**
   * Sets the AbortSignal's `aborted` flag and signal to any observers
   * that the associated activity is to be aborted.
   */
  public cancel(): void {
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
  private async request<TData extends PlainObject>(
      uri: string,
      options?: HttpOptions,
  ): Promise<TData> {
    // add the aborting signalizer to the HTTP request settings
    const requestOptions: HttpOptions = {
      ...options,
      signal: this.signal,
    };

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
   * @param {String} url Contains the url of the resource to be deleted.
   * @param {HttpDeleteOptions} options Contains the custom settings applied
   * to the request.
   * @return {Promise<TData>} the deleted object.
   */
  public async deleteAsync<TData extends PlainObject>(
      url: string,
      options?: HttpDeleteOptions,
  ): Promise<TData> {
    const requestOptions: HttpOptions = {
      ...options,
      method: HttpMethod.DELETE,
    };

    return await this.request(url, requestOptions);
  }

  /**
   * Sends an HTTP Get request to the server.
   *
   * @param {String} url Contains the url of the resource to be gotten.
   * @param {HttpGetOptions} options Contains the custom settings applied
   * to the GET request.
   * @return {Promise<TData>} the object gotten.
   */
  public async getAsync<TData extends PlainObject>(
      url: string,
      options?: HttpGetOptions,
  ): Promise<TData> {
    const requestOptions: HttpOptions = {
      ...options,
      method: HttpMethod.DELETE,
    };

    return await this.request(url, requestOptions);
  }

  /**
   * Sends an HTTP Post request to the server.
   *
   * @param {String} url Contains the url of the resource to be posted.
   * @param {*} body Contains the body of the POST request.
   * @param {HttpPostOptions} options Contains the custom settings applied to
   * the POST request.
   * @return {Promise<TData>} the object posted to the server.
   */
  public async postAsync<TData extends PlainObject>(
    url: string,
    body: any | null,
    options?: HttpPostOptions
  ): Promise<TData>;
  /**
   * Sends an HTTP Post request to the server.
   *
   * @param {String} url Contains the url of the resource to be posted.
   * @param {*} body Contains the body of the POST request.
   * @param {HttpPostOptions} options Contains the custom settings applied to
   * the POST request.
   * @return {Promise<TData>} the object posted to the server.
   */
  public async postAsync<TData extends PlainObject>(
      url: string,
      body: TData extends undefined ? never : TData | any | null,
      options?: HttpPostOptions,
  ): Promise<TData> {
    const requestOptions: HttpOptions = {
      ...options,
      // @todo Note:
      // Regarding the default headers of the service it is still unclear which
      // headers will be added to the HTTP request by default.
      //
      headers: options?.headers ?? {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: HttpMethod.POST,
      body,
    };

    return await this.request(url, requestOptions);
  }

  /**
   * Sends an HTTP Put request to the server.
   *
   * @param {String} url Contains the url of the resource to be replaced.
   * @param {*} body Contains the body of the PUT request.
   * @param {HttpPutOptions} options Contains the custom settings applied to
   * the PUT request.
   * @return {Promise<TData>} the object which was replaced.
   */
  public async putAsync<TData extends PlainObject>(
    url: string,
    body: any | null,
    options?: HttpPutOptions
  ): Promise<TData>;
  /**
   * Sends an HTTP Put request to the server.
   *
   * @param {String} url Contains the url of the resource to be replaced.
   * @param {*} body Contains the body of the PUT request.
   * @param {HttpPutOptions} options Contains the custom settings applied to
   * the PUT request.
   * @return {Promise<TData>} the object which was replaced.
   */
  public async putAsync<TData extends PlainObject>(
      url: string,
      body: TData extends undefined ? never : TData | any | null,
      options?: HttpPutOptions,
  ): Promise<TData> {
    const requestOptions: HttpOptions = {
      ...options,
      method: HttpMethod.PUT,
      body,
    };

    return await this.request(url, requestOptions);
  }
}
