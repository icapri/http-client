import { HttpMethod } from './HttpMethod';
import { HttpHeaders } from './HttpHeaders';
import { HttpRequestBody } from './HttpRequestBody';
import { HttpRequestCredentials } from './HttpRequestCredentials';
import { HttpResponseType } from './HttpResponseType';
import { AbortionSignal } from './AbortionSignal';

export interface HttpRequestOptions {
  body?: HttpRequestBody;
  credentials?: HttpRequestCredentials;
  headers?: HttpHeaders;
  method: HttpMethod;
  responseType?: HttpResponseType;
  signal?: AbortionSignal;
  timeout?: number;
  withCredentials?: boolean;
}

type HttpDeleteOptions = Omit<HttpRequestOptions, 'method'>;
type HttpGetOptions = Omit<HttpRequestOptions, 'body' | 'method'>;
type HttpHeadOptions = Omit<HttpRequestOptions, 'body' | 'method'>;
type HttpOptions = Omit<HttpRequestOptions, 'body' | 'method'>;
type HttpPatchOptions = Omit<HttpRequestOptions, 'method'>;
type HttpPostOptions = Omit<HttpRequestOptions, 'method'>;
type HttpPutOptions = Omit<HttpRequestOptions, 'method'>;

export type {
  HttpDeleteOptions,
  HttpGetOptions,
  HttpHeadOptions,
  HttpOptions,
  HttpPatchOptions,
  HttpPostOptions,
  HttpPutOptions,
};
