import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapboxComponent } from './mapbox/mapbox.component';



@NgModule({
  declarations: [
    MapboxComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [MapboxComponent]
})
export class MapModule { }
