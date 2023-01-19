import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { DrawerService } from '../drawer/drawer.service';


@Injectable({
  providedIn: 'root'
})
export class MapService {
  token: string;

  constructor(private drawerService: DrawerService) {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
    this.token = mapboxgl.accessToken
  
  }
}
