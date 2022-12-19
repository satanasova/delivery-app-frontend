import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllOfficesComponent } from './all-offices/all-offices.component';
import { SingleOfficeComponent } from './single-office/single-office.component';
import { RouterModule } from '@angular/router';
import { NbCardModule, NbIconModule, NbListModule } from '@nebular/theme';
import { TableModule} from 'primeng/table';
import { DemoTableComponent } from './demo-table/demo-table.component'
import { CustomerService } from './demo-table/customerservice';
import {SliderModule} from 'primeng/slider';
import {ProgressBarModule} from 'primeng/progressbar';
import { FormsModule } from '@angular/forms';
import {MultiSelectModule} from 'primeng/multiselect';

const routes = [
  {path: 'offices', component: AllOfficesComponent},
  {path: 'offices/:officeId', component: SingleOfficeComponent}
]

@NgModule({
  declarations: [
    AllOfficesComponent,
    SingleOfficeComponent,
    DemoTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NbCardModule,
    NbListModule,
    NbIconModule,
    TableModule,
    SliderModule,
    ProgressBarModule,
    FormsModule,
    MultiSelectModule
  ],
  providers: [CustomerService]
})
export class OfficesModule { }
