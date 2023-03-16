export class AbortionSignal extends EventTarget {
  public get aborted(): boolean {
    return this._aborted;
  }

  public set aborted(aborted: boolean) {
    this._aborted = aborted;
  }

  private _aborted = false;
}
