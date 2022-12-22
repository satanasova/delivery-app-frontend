import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import { NbCardModule, NbDialogModule, NbIconModule, NbRadioModule } from '@nebular/theme';
import { SettingsService } from './settings/settings.service';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { TableModule} from 'primeng/table';
import {SliderModule} from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import {MultiSelectModule} from 'primeng/multiselect';
import {CalendarModule} from 'primeng/calendar';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';



@NgModule({
  declarations: [
    SettingsComponent,
    SmartTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NbDialogModule.forChild(),
    NbCardModule,
    NbRadioModule,
    NbIconModule,
    TableModule,
    SliderModule,
    MultiSelectModule,
    CalendarModule,
    TriStateCheckboxModule
  ],
  exports: [SmartTableComponent]
})
export class UtilsModule { }
