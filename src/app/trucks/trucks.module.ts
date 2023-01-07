import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllTrucksComponent } from './all-trucks/all-trucks.component';
import { SingleTruckComponent } from './single-truck/single-truck.component';
import { RouterModule } from '@angular/router';
import { GoBackDirective } from '../utils/go-back/go-back.directive';
import { UtilsModule } from '../utils/utils.module';
import { NbIconModule } from '@nebular/theme';

let routes = [
  {path: 'trucks', component: AllTrucksComponent},
  {path: 'trucks/:truckId', component: SingleTruckComponent}
]

@NgModule({
  declarations: [
    AllTrucksComponent,
    SingleTruckComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UtilsModule,
    NbIconModule
  ]
})
export class TrucksModule { }
