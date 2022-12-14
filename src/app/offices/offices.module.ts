import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllOfficesComponent } from './all-offices/all-offices.component';
import { SingleOfficeComponent } from './single-office/single-office.component';
import { RouterModule } from '@angular/router';
import { NbCardModule, NbIconModule, NbListModule } from '@nebular/theme';
import { TableModule} from 'primeng/table'

const routes = [
  {path: 'offices', component: AllOfficesComponent},
  {path: 'offices/:officeId', component: SingleOfficeComponent}
]

@NgModule({
  declarations: [
    AllOfficesComponent,
    SingleOfficeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NbCardModule,
    NbListModule,
    NbIconModule,
    TableModule
    
  ]
})
export class OfficesModule { }
