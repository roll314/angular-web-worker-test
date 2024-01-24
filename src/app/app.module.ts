import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ControlPanelComponent} from './ui/control-panel/control-panel.component';
import {ChildDataCellComponent} from './ui/table/child-data-cell/child-data-cell.component';
import {TableHeaderComponent} from './ui/table/table-header/table-header.component';
import {TableRowComponent} from './ui/table/table-row/table-row.component';
import {TableComponent} from './ui/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    TableRowComponent,
    ChildDataCellComponent,
    TableHeaderComponent,
    ControlPanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
