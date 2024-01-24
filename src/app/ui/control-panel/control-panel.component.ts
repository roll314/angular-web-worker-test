import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {filter, map, takeUntil} from 'rxjs';
import {DestroyService} from '../../services/destroy.service';
import {WorkerDataService} from '../../services/worker-data.service';

enum FormFields {
  EMIT_INTERVAL = 'emitInterval',
  DATA_COUNT = 'dataCount',
  OVERRIDED_IDS = 'overridedIds'
}

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class ControlPanelComponent {

  readonly FormFields = FormFields;

  readonly form = new FormGroup({
    [FormFields.EMIT_INTERVAL]: new FormControl(this.workerDataService.emitInterval$.value),
    [FormFields.DATA_COUNT]: new FormControl(this.workerDataService.dataCount$.value),
    [FormFields.OVERRIDED_IDS]: new FormControl(this.workerDataService.overridedIds$.value.join(', ')),
  })

  constructor(
    private workerDataService:  WorkerDataService,
    private destroy$: DestroyService,
  ) {
    this.form.get(FormFields.EMIT_INTERVAL)?.valueChanges
      .pipe(
        filter(value => value !== null),
        takeUntil(this.destroy$)
      )
      .subscribe(value => this.workerDataService.emitInterval$.next(value!));

    this.form.get(FormFields.DATA_COUNT)?.valueChanges
      .pipe(
        filter(value => value !== null),
        takeUntil(this.destroy$)
      )
      .subscribe(value => this.workerDataService.dataCount$.next(value!));

    this.form.get(FormFields.OVERRIDED_IDS)?.valueChanges
      .pipe(
        filter(value => value !== null),
        map(value =>
          value!
            .split(',')
            .map(item => item.trim())
            .filter(item => item.length > 0)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(value => this.workerDataService.overridedIds$.next(value!));
  }
}
