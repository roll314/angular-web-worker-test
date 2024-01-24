import {ChangeDetectionStrategy, Component} from '@angular/core';
import {map} from 'rxjs';
import {DestroyService} from './services/destroy.service';
import {WorkerDataService} from './services/worker-data.service';
import {SLICE_DATA_SIZE} from './settings';
import {UiData} from './types/ui-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class AppComponent {
  readonly data$ = this.workerDataService.uiData$;

  constructor(
    private destroy$: DestroyService,
    private workerDataService: WorkerDataService,
  ) {
    this.workerDataService.start();
  }
}
