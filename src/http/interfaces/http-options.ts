import {HttpMethod} from '../types/http-method';

import {HttpHeaders} from '../types/http-headers';

/**
 * Represents the object with settings applied to a given HTTP request.
 */
export interface HttpOptions extends RequestInit {

  /**
   * Contains the body of the HTTP request.
   */
  body?: BodyInit | null;

  /**
   * Contains the HTTP request method.
   */
  method?: HttpMethod;

  /**
   * Contains the HTTP request headers.
   */
  headers?: Partial<Record<HttpHeaders, string>>;
}

/**
 * Represents the object of HTTP options applied to a given HTTP Delete request.
 */
export type HttpDeleteOptions = Omit<HttpOptions, 'method'>;

/**
 * Representsthe object of HTTP options applied to a given HTTP Get request.
 */
export type HttpGetOptions = Omit<HttpOptions, 'method' | 'body'>;

/**
 * Represents the object of HTTP options applied to a given HTTP Post request.
 */
export type HttpPostOptions = Omit<HttpOptions, 'method' | 'body'>;

/**
 * Represents the object of HTTP options applied to a given HTTP Put request.
 */
export type HttpPutOptions = Omit<HttpOptions, 'method' | 'body'>;
