import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { MapboxSetup } from './models';


@Injectable({
  providedIn: 'root'
})
export class MapService {
  token: string;

  constructor() {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
    this.token = mapboxgl.accessToken
  
    // locations.forEach(location => {
    //   const newMarker = new mapboxgl.Marker({color:'#0000ff'});
    //   newMarker.setLngLat(location.lngLat);
    //   newMarker.addTo(map)
    // })
  }

  createMap(mapSetup: MapboxSetup) {
    return new mapboxgl.Map(mapSetup)
  }
  
  // createMarker(markerSetup: any) {
  //   return new mapboxgl.Marker(markerSetup)
  // }
}
