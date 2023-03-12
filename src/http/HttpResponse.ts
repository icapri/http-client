import { Nullable } from '../utils';
import { HttpHeaders } from './HttpHeaders';
import { HttpStatusCode } from './HttpStatusCode';

export abstract class HttpResponse {
  readonly headers: HttpHeaders;
  readonly status: HttpStatusCode;
  readonly statusText: string;
  readonly url: Nullable<string>;
  readonly ok: boolean;

  constructor(
    init: {
      headers?: HttpHeaders,
      status?: number,
      statusText?: string,
      url?: string,
    }
  ) {
    this.headers = init.headers || {};
    this.status = init.status || HttpStatusCode.OK;
    this.statusText = init.statusText || 'OK';
    this.url = init.url || null;
    this.ok = this.status >= 200 && this.status < 300;
  }
}
