import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllPackagesComponent } from './all-packages/all-packages.component';
import { SinglePackageComponent } from './single-package/single-package.component';
import { RouterModule } from '@angular/router';
import { UtilsModule } from '../utils/utils.module';
import { NbCardModule, NbIconModule, NbListModule } from '@nebular/theme';
import { TableModule} from 'primeng/table';
import {ProgressSpinnerModule} from 'primeng/progressspinner';


const routes = [
  {path: 'packages', component: AllPackagesComponent},
  {path: 'packages/:packageId', component: SinglePackageComponent}
]

@NgModule({
  declarations: [
    AllPackagesComponent,
    SinglePackageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UtilsModule,
    TableModule,
    ProgressSpinnerModule,
    NbCardModule,
    NbIconModule,
    NbListModule
  ]
})
export class PackagesModule { }
