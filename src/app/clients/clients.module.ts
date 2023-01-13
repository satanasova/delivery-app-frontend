import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllClientsComponent } from './all-clients/all-clients.component';
import { SingleClientComponent } from './single-client/single-client.component';
import { RouterModule } from '@angular/router';
import { UtilsModule } from '../utils/utils.module';
import { NbCardModule, NbIconModule, NbSpinnerModule } from '@nebular/theme';

const routes = [
  {path: 'clients', component: AllClientsComponent},
  {path: 'clients/:clientId', component: SingleClientComponent}
]

@NgModule({
  declarations: [
    AllClientsComponent,
    SingleClientComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UtilsModule,
    NbCardModule,
    NbIconModule,
    NbSpinnerModule
  ]
})
export class ClientsModule { }
