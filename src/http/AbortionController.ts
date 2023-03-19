import { AbortionSignal } from './AbortionSignal';

/**
 * Defines a request abortion controller.
 */
export class AbortionController {
  /**
   * Gets the request abortion signal.
   */
  public get signal(): AbortionSignal {
    return this._signal;
  }

  /**
   * Contains the request abortion signal.
   */
  private readonly _signal: AbortionSignal;

  /**
   * Initializes a new instance of the abortion controller.
   */
  constructor() {
    this._signal = new AbortionSignal();
  }

  /**
   * Signalizes the abortion of a given request.
   */
  abort(): void {
    const event = new CustomEvent('aborted');
    this._signal.dispatchEvent(event);
    this._signal.aborted = true;
  };
}
