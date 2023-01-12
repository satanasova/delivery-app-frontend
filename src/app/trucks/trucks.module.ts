import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllTrucksComponent } from './all-trucks/all-trucks.component';
import { SingleTruckComponent } from './single-truck/single-truck.component';
import { RouterModule } from '@angular/router';
import { UtilsModule } from '../utils/utils.module';
import { NbCardModule, NbIconModule } from '@nebular/theme';
import { HttpClientModule } from '@angular/common/http';

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
    NbIconModule,
    HttpClientModule,
    NbCardModule
  ]
})
export class TrucksModule { }
