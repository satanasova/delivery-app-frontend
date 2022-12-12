import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllPackagesComponent } from './all-packages/all-packages.component';
import { SinglePackageComponent } from './single-package/single-package.component';
import { RouterModule } from '@angular/router';

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
    RouterModule.forChild(routes)
  ]
})
export class PackagesModule { }
