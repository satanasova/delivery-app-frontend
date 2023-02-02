import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapboxComponent } from './mapbox/mapbox.component';
import { NbIconModule } from '@nebular/theme';



@NgModule({
  declarations: [
    MapboxComponent
  ],
  imports: [
    CommonModule,
    NbIconModule
  ],
  exports: [MapboxComponent]
})
export class MapModule { }
