import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllDeliveriesComponent } from './all-deliveries/all-deliveries.component';
import { SingleDeliveryComponent } from './single-delivery/single-delivery.component';
import { RouterModule } from '@angular/router';

const routes = [
  {path: 'deliveries', component: AllDeliveriesComponent},
  {path: 'deliveries/:deliveryId', component: SingleDeliveryComponent}
]

@NgModule({
  declarations: [
    AllDeliveriesComponent,
    SingleDeliveryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DeliveriesModule { }
