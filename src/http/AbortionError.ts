import { AugmentedError } from './AugmentedError';
import { HttpHeaders } from './HttpHeaders';
import { HttpStatusCode } from './HttpStatusCode';

export class AbortionError extends AugmentedError {
  readonly name = 'AbortionError';
  readonly message;

  constructor(init: {
    error?: any;
    headers?: HttpHeaders;
    status?: HttpStatusCode;
    statusText?: string;
    url: string;
  },) {
    super(init);
    this.message = `Request "${init.url}" aborted.`
  }
}
