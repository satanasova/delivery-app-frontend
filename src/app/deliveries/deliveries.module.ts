import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllDeliveriesComponent } from './all-deliveries/all-deliveries.component';
import { SingleDeliveryComponent } from './single-delivery/single-delivery.component';
import { RouterModule } from '@angular/router';
import { UtilsModule } from '../utils/utils.module';
import { NbAccordionModule, NbCardModule, NbIconModule, NbSpinnerModule } from '@nebular/theme';
import { DeliveryPreviewComponent } from './delivery-preview/delivery-preview.component';
import { TableModule } from 'primeng/table';

const routes = [
  {path: 'deliveries', component: AllDeliveriesComponent},
  {path: 'deliveries/:deliveryId', component: SingleDeliveryComponent}
]

@NgModule({
  declarations: [
    AllDeliveriesComponent,
    SingleDeliveryComponent,
    DeliveryPreviewComponent
  ],
  imports: [
    CommonModule,
    UtilsModule,
    RouterModule.forChild(routes),
    UtilsModule,
    NbCardModule,
    NbSpinnerModule,
    NbIconModule,
    NbAccordionModule,
    TableModule

  ]
})
export class DeliveriesModule { }
