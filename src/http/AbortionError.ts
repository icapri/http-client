import { AugmentedError } from './AugmentedError';
import { HttpHeaders } from './HttpHeaders';
import { HttpStatusCode } from './HttpStatusCode';

/**
 * Defines an abortion error.
 */
export class AbortionError extends AugmentedError {
  /**
   * Contains the error name.
   */
  readonly name = 'AbortionError';

  /**
   * Contains the error message.
   */
  readonly message;

  /**
   * Initializes a new instance of the abortion error.
   * @param init Contains the init object for the abortion error.
   */
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
