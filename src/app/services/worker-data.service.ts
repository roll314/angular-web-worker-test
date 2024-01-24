import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, map, Subject, take, takeUntil} from 'rxjs';
import {SLICE_DATA_SIZE} from '../settings';
import {LogType} from '../types/log-type';
import {PsuedoSocketDto} from '../types/psuedo-socket-dto';
import {UiData} from '../types/ui-data';
import {WorkerResponse, WorkerResponseType} from '../types/worker-response';
import {DestroyService} from './destroy.service';
import {LogService} from './log.service';
import {WorkerService} from './worker.service';

const INITIAL_EMIT_INTERVAL = 300;
const INITIAL_DATA_COUNT = 1000;

@Injectable({providedIn: 'root'})
export class WorkerDataService extends DestroyService {

  readonly emitInterval$ = new BehaviorSubject(INITIAL_EMIT_INTERVAL);
  readonly dataCount$ = new BehaviorSubject(INITIAL_DATA_COUNT);
  readonly overridedIds$ = new BehaviorSubject<string[]>([]);

  private readonly _lastWorkerData$ = new Subject<PsuedoSocketDto>()
  readonly lastWorkerData$ = this._lastWorkerData$.asObservable();

  readonly uiData$ = combineLatest([
    this.overridedIds$,
    this.lastWorkerData$
  ])
    .pipe(
      map(([overridedIds, data]) =>
        data.slice(0, SLICE_DATA_SIZE).map((item, index) =>
          UiData.from(item, overridedIds[index])
        )
      )
    );

  constructor(
    private workerService: WorkerService,
    private logService: LogService
  ) {
    super();
  }

  start() {
    if (this.workerService.hasWorker) {
      this.logService.log(LogType.WARN, 'WorkerDataService was already inited');
      return;
    }

    this.workerService.createWebWorker();

    this.workerService.startPseudoSocket(this.emitInterval$.value, this.dataCount$.value);

    this.workerService.onResponse$
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => this.processWorkerResponse(response));

    this.emitInterval$
      .pipe(takeUntil(this.destroy$))
      .subscribe(emitInterval => this.workerService.setEmitInterval(emitInterval));

    this.dataCount$
      .pipe(takeUntil(this.destroy$))
      .subscribe(dataCount => this.workerService.setDataCount(dataCount));
  }

  private processWorkerResponse(response: WorkerResponse) {
    switch (response.type) {
      case WorkerResponseType.DATA:
        this._lastWorkerData$.next(response.data);
        break;
      case WorkerResponseType.ERROR:
        this.logService.log(LogType.ERROR, response.error.message);
        break;
    }
  }
}
