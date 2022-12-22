import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllOfficesComponent } from './all-offices/all-offices.component';
import { SingleOfficeComponent } from './single-office/single-office.component';
import { RouterModule } from '@angular/router';
import { UtilsModule } from '../utils/utils.module';
import { NbCardModule, NbIconModule} from '@nebular/theme';
import { TableModule} from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
// import {SliderModule} from 'primeng/slider';
// import { FormsModule } from '@angular/forms';
// import {MultiSelectModule} from 'primeng/multiselect';
// import {CalendarModule} from 'primeng/calendar';
// import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';
// import {ProgressBarModule} from 'primeng/progressbar';


const routes = [
  {path: 'offices', component: AllOfficesComponent},
  {path: 'offices/:officeId', component: SingleOfficeComponent}
]

@NgModule({
  declarations: [
    AllOfficesComponent,
    SingleOfficeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UtilsModule,
    NbCardModule,
    NbIconModule,
    TableModule,
    ProgressSpinnerModule
  ],
  providers: []
})
export class OfficesModule { }
