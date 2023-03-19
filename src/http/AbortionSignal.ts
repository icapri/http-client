/**
 * Defines a request abortion signalizer.
 */
export class AbortionSignal extends EventTarget {
  /**
   * Gets whether the given request is aborted.
   */
  public get aborted(): boolean {
    return this._aborted;
  }

  /**
   * Sets whether the given request is aborted.
   */
  public set aborted(aborted: boolean) {
    this._aborted = aborted;
  }

  /**
   * Contains whether the given request is aborted.
   */
  private _aborted = false;
}
