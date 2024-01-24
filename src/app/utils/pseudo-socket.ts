import {Subject} from 'rxjs';
import {LogType} from '../types/log-type';
import {PsuedoSocketColor, PsuedoSocketDto, PsuedoSocketDtoId} from '../types/psuedo-socket-dto';
import {log} from './log';

const FLOAT_DECIMALS = 18;
const MAX_FLOAT_VALUE = 1e+9;
const MIN_FLOAT_VALUE = 0;

const MAX_INT_VALUE = Number.MAX_SAFE_INTEGER;
const MIN_INT_VALUE = 0;

export class PseudoSocket {

  get emitIntervalMs(): number {
    return this._emitIntervalMs;
  }

  set emitIntervalMs(value: number) {
    this._emitIntervalMs = value;
    this.rescheduleEmit();
  }

  get dataCount(): number {
    return this._dataCount;
  }

  set dataCount(value: number) {
    this._dataCount = value;
  }

  private readonly _onMessage$ = new Subject<PsuedoSocketDto>()
  readonly onMessage$ = this._onMessage$.asObservable();

  private intervalId?: number;

  constructor(
    private _emitIntervalMs: number,
    private _dataCount: number
  ) {
  }

  private flushEmit() {
    clearInterval(this.intervalId);
  }

  scheduleEmit() {
    this.intervalId = setInterval(() => {
      this._onMessage$.next(this.generateData())
    }, this._emitIntervalMs);
  }

  rescheduleEmit() {
    this.flushEmit();
    this.scheduleEmit();
  }

  private generateData(): PsuedoSocketDto {
    const res: PsuedoSocketDto = [];

    log(LogType.INFO, 'Socket data generation was started');
    const start = Date.now();

    for (let i = 0; i < this._dataCount; i++) {
      res.push({
        id: this.generateId(),
        int: this.getRandomInt(MIN_INT_VALUE, MAX_INT_VALUE),
        float: this.getRandomFloat(MIN_FLOAT_VALUE, MAX_FLOAT_VALUE,  FLOAT_DECIMALS),
        color: this.getRandomColor(),
        child: {
          id: this.generateId(),
          color: this.getRandomColor(),
        }
      });
    }

    const end = Date.now();
    log(LogType.INFO, `Socket data generation was ended ${end - start}ms`);

    return res;
  }

  generateId(): PsuedoSocketDtoId {
    return Math.random().toString(16).slice(2);
  }

  private getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomFloat(min: number, max: number, decimals: number): number {
    const str = this.getRandomArbitrary(min, max).toFixed(decimals);
    return parseFloat(str);
  }

  getRandomColor(): PsuedoSocketColor {
    const r = Math.round(this.getRandomArbitrary(0, 255));
    const g = Math.round(this.getRandomArbitrary(0, 255));
    const b = Math.round(this.getRandomArbitrary(0, 255));
    return `rgb(${r}, ${g}, ${b})`;
  }
}
