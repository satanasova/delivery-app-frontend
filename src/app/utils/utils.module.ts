import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import { NbAccordionModule, NbCardModule, NbDialogModule, NbIconModule, NbRadioModule } from '@nebular/theme';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { TableModule } from 'primeng/table';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { GoBackDirective } from './go-back/go-back.directive';
import { DisplayItemCardComponent } from './display-item-card/display-item-card.component';
import { CustomAccordionComponent } from './custom-accordion/custom-accordion.component';


@NgModule({
  declarations: [
    SettingsComponent,
    SmartTableComponent,
    GoBackDirective,
    DisplayItemCardComponent,
    CustomAccordionComponent
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
    TriStateCheckboxModule,
    NbAccordionModule
  ],
  exports: [SmartTableComponent, GoBackDirective, DisplayItemCardComponent, CustomAccordionComponent]
})
export class UtilsModule { }
