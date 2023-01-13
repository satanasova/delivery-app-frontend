import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllOfficesComponent } from './all-offices/all-offices.component';
import { SingleOfficeComponent } from './single-office/single-office.component';
import { RouterModule } from '@angular/router';
import { UtilsModule } from '../utils/utils.module';
import { NbAccordionModule, NbCardModule, NbIconModule, NbSpinnerModule} from '@nebular/theme';



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
    NbAccordionModule,
    NbSpinnerModule
  ],
  providers: []
})
export class OfficesModule { }
