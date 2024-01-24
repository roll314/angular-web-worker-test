import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {PsuedoSocketDtoChild} from '../../../types/psuedo-socket-dto';

@Component({
  selector: 'app-child-data-cell',
  templateUrl: './child-data-cell.component.html',
  styleUrls: ['./child-data-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildDataCellComponent {
  @Input({required: true})
  childData!: PsuedoSocketDtoChild;
}
