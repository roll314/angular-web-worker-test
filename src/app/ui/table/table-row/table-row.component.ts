import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {UiData} from '../../../types/ui-data';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableRowComponent {
  @Input({required: true})
  row!: UiData;
}
