import {Injectable, OnDestroy} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class DestroyService extends Observable<void> implements OnDestroy {
  protected readonly destroy$ = new Subject<void>();

  constructor() {
    super(subscriber => this.destroy$.subscribe(subscriber));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
