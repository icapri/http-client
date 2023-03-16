import { AbortionSignal } from './AbortionSignal';

export class AbortionController {

  public get signal(): AbortionSignal {
    return this._signal;
  }

  private readonly _signal = new AbortionSignal();

  abort(): void {
    const event = new CustomEvent('aborted');
    this._signal.dispatchEvent(event);
    this._signal.aborted = true;
  };
}
