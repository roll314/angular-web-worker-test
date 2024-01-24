import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {LogType} from '../types/log-type';
import {
  CommandType,
  SetDataCountCommand,
  SetEmitIntervalCommand,
  StartPseudoSocketCommand,
  WorkerCommand
} from '../types/worker-command';
import {WorkerResponse} from '../types/worker-response';
import {LogService} from './log.service';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  private worker?: Worker;

  get hasWorker(): boolean {
    return !!this.worker;
  }

  private readonly _onResponse$ = new Subject<WorkerResponse>();
  readonly onResponse$ = this._onResponse$.asObservable();

  constructor(
    private logService: LogService
  ) {
  }

  createWebWorker() {
    if (this.worker) {
      this.logService.log(LogType.ERROR, 'Worker was already created');
      return;
    }

    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(new URL('../workers/main.worker', import.meta.url));
      this.worker.onmessage = ({ data }) => this._onResponse$.next(data);
    } else {
      this.logService.log(LogType.ERROR, 'Web workers does not supported in this browser');
    }
  }

  private sendToWorker(command: WorkerCommand) {
    if (!this.worker) {
      this.logService.log(LogType.ERROR, 'Worker was not created');
      return;
    }

    this.worker.postMessage(command);
  }

  startPseudoSocket(emitIntervalMs: number, dataCount: number) {
    if (!this.worker) {
      this.logService.log(LogType.ERROR, 'Worker was not created');
      return;
    }

    const command: StartPseudoSocketCommand = {
      type: CommandType.START_PSEUDO_SOCKET,
      dataCount,
      emitIntervalMs
    };
    this.sendToWorker(command);
  }

  setEmitInterval(emitIntervalMs: number) {
    if (!this.worker) {
      this.logService.log(LogType.ERROR, 'Worker was not created');
      return;
    }

    const command: SetEmitIntervalCommand = {
      type: CommandType.SET_EMIT_INTERVAL,
      emitIntervalMs
    };
    this.sendToWorker(command);
  }

  setDataCount(dataCount: number) {
    if (!this.worker) {
      this.logService.log(LogType.ERROR, 'Worker was not created');
      return;
    }

    const command: SetDataCountCommand = {
      type: CommandType.SET_DATA_COUNT,
      dataCount,
    };
    this.sendToWorker(command);
  }
}
