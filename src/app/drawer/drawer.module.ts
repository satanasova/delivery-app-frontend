import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbIconModule, NbSidebarModule } from '@nebular/theme';
import { DrawerComponent } from './drawer/drawer.component';
import { OfficesModule } from '../offices/offices.module';



@NgModule({
  declarations: [
    DrawerComponent
  ],
  imports: [
    CommonModule,
    NbSidebarModule,
    OfficesModule,
    NbIconModule
  ],
  exports: [DrawerComponent]
})
export class DrawerModule { }
