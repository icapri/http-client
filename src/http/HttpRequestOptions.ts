import { HttpMethod } from './HttpMethod';
import { HttpHeaders } from './HttpHeaders';
import { HttpRequestBody } from './HttpRequestBody';
import { HttpRequestCredentials } from './HttpRequestCredentials';
import { HttpResponseType } from './HttpResponseType';

export interface HttpRequestOptions {
  body?: HttpRequestBody;
  credentials?: HttpRequestCredentials;
  headers?: HttpHeaders;
  method: HttpMethod;
  responseType?: HttpResponseType;
  withCredentials?: boolean;
  timeout?: number;
}
