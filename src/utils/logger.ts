const log = true;

export class Logger {
  constructor(private id: string) {}

  public info(msg: string, obj?: any): void {
    return this._log(() => console.log(`${this.id}: ${msg}`, obj)); // tslint:disable-line
  }

  public warn(msg: string, obj?: any): void {
    return this._log(() => console.warn(`${this.id}: ${msg}`, obj)); // tslint:disable-line
  }

  public error(msg: string, obj?: any): void {
    return this._log(() => console.error(`${this.id}: ${msg}`, obj)); // tslint:disable-line
  }

  private _log(fn: () => void): void {
    if (!log) {
      return;
    }
    return fn();
  }
}
