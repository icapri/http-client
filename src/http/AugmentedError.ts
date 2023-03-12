import { HttpHeaders } from './HttpHeaders';
import { HttpResponse } from './HttpResponse';
import { HttpStatusCode } from './HttpStatusCode';

export class AugmentedError extends HttpResponse implements Error {
  readonly error: any | null;
  readonly message: string;
  readonly name: string = 'AugmentedError';
  override readonly ok: boolean = false;

  constructor(init: {
    error?: any;
    headers?: HttpHeaders;
    status?: HttpStatusCode;
    statusText?: string;
    url?: string;
  },
  ) {
    super(init);
    const isSuccess = this.status >= 200 && this.status < 300;
    const statusInfo = ` ${init.status} ${init.statusText}`
    const msg = `Request "${init.url}" failed.`;
    this.message = isSuccess ? msg : msg.concat(statusInfo);
    this.error = init.error || null;
  }
}
