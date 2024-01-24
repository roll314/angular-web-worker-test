import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {PsuedoSocketDtoId} from '../../types/psuedo-socket-dto';
import {UiData} from '../../types/ui-data';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  @Input({required: true})
  data: UiData[] = [];

  trackById(index: number, item: UiData): PsuedoSocketDtoId {
    return item.id;
  }
}
