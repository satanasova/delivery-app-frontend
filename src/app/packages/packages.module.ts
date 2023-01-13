import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { AllPackagesComponent } from './all-packages/all-packages.component';
import { SinglePackageComponent } from './single-package/single-package.component';
import { RouterModule } from '@angular/router';
import { UtilsModule } from '../utils/utils.module';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbDialogModule, NbIconModule, NbInputModule, NbListModule, NbSelectModule, NbSpinnerModule } from '@nebular/theme';
import { TableModule} from 'primeng/table';
import { CreatePackageComponent } from './create-package/create-package.component';
import { ReactiveFormsModule } from '@angular/forms';


const routes = [
  {path: 'packages', component: AllPackagesComponent},
  {path: 'packages/:packageId', component: SinglePackageComponent}
]

@NgModule({
  declarations: [
    AllPackagesComponent,
    SinglePackageComponent,
    CreatePackageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    UtilsModule,
    TableModule,
    NbCardModule,
    NbIconModule,
    NbListModule,
    NbButtonModule,
    NbDialogModule,
    NbInputModule,
    NbSelectModule,
    NbCheckboxModule,
    NbSpinnerModule
  ],
  providers: [ TitleCasePipe ]
})
export class PackagesModule { }
