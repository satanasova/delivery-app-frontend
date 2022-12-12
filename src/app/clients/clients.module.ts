import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllClientsComponent } from './all-clients/all-clients.component';
import { SingleClientComponent } from './single-client/single-client.component';
import { RouterModule } from '@angular/router';

const routes = [
  {path: 'clients', component: AllClientsComponent},
  {path: 'clients/:id', component: SingleClientComponent}
]

@NgModule({
  declarations: [
    AllClientsComponent,
    SingleClientComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ClientsModule { }
