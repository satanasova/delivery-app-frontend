import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Office } from 'src/app/offices/models';
import { OfficesService } from 'src/app/offices/offices.service';
import { MapService } from '../map.service';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.scss']
})
export class MapboxComponent implements OnInit, AfterViewInit {
  map: any;
  offices: Office[] = [];
  routeFromPostman = {
    "totalDistance": 145.65,
    "points": [
        {
            "points": {
                "lat": 43.84452,
                "lng": 25.95413
            },
            "totalDistance": 0.04,
            "difference": 0.04
        },
        {
            "points": {
                "lat": 43.84488,
                "lng": 25.95407
            },
            "totalDistance": 0.72,
            "difference": 0.68
        },
        {
            "points": {
                "lat": 43.84043,
                "lng": 25.94823
            },
            "totalDistance": 1.1,
            "difference": 0.38
        },
        {
            "points": {
                "lat": 43.83715,
                "lng": 25.94932
            },
            "totalDistance": 3.55,
            "difference": 2.45
        },
        {
            "points": {
                "lat": 43.81956,
                "lng": 25.93091
            },
            "totalDistance": 7.39,
            "difference": 3.84
        },
        {
            "points": {
                "lat": 43.78746,
                "lng": 25.91343
            },
            "totalDistance": 9.19,
            "difference": 1.8
        },
        {
            "points": {
                "lat": 43.77592,
                "lng": 25.89767
            },
            "totalDistance": 15.87,
            "difference": 6.68
        },
        {
            "points": {
                "lat": 43.7182,
                "lng": 25.9205
            },
            "totalDistance": 19.76,
            "difference": 3.89
        },
        {
            "points": {
                "lat": 43.68432,
                "lng": 25.90868
            },
            "totalDistance": 23.08,
            "difference": 3.32
        },
        {
            "points": {
                "lat": 43.6633,
                "lng": 25.87932
            },
            "totalDistance": 25.92,
            "difference": 2.84
        },
        {
            "points": {
                "lat": 43.63832,
                "lng": 25.87171
            },
            "totalDistance": 28.66,
            "difference": 2.74
        },
        {
            "points": {
                "lat": 43.61853,
                "lng": 25.85134
            },
            "totalDistance": 33.88,
            "difference": 5.22
        },
        {
            "points": {
                "lat": 43.57626,
                "lng": 25.82322
            },
            "totalDistance": 37.15,
            "difference": 3.27
        },
        {
            "points": {
                "lat": 43.54718,
                "lng": 25.81681
            },
            "totalDistance": 38.44,
            "difference": 1.29
        },
        {
            "points": {
                "lat": 43.54134,
                "lng": 25.80302
            },
            "totalDistance": 40.64,
            "difference": 2.2
        },
        {
            "points": {
                "lat": 43.52216,
                "lng": 25.79645
            },
            "totalDistance": 43.76,
            "difference": 3.12
        },
        {
            "points": {
                "lat": 43.4944,
                "lng": 25.80226
            },
            "totalDistance": 45.92,
            "difference": 2.16
        },
        {
            "points": {
                "lat": 43.48278,
                "lng": 25.78078
            },
            "totalDistance": 46.75,
            "difference": 0.83
        },
        {
            "points": {
                "lat": 43.48289,
                "lng": 25.77055
            },
            "totalDistance": 47.48,
            "difference": 0.73
        },
        {
            "points": {
                "lat": 43.47691,
                "lng": 25.76695
            },
            "totalDistance": 50.83,
            "difference": 3.35
        },
        {
            "points": {
                "lat": 43.46789,
                "lng": 25.72733
            },
            "totalDistance": 55.3,
            "difference": 4.47
        },
        {
            "points": {
                "lat": 43.46732,
                "lng": 25.67198
            },
            "totalDistance": 56.45,
            "difference": 1.15
        },
        {
            "points": {
                "lat": 43.4606,
                "lng": 25.66111
            },
            "totalDistance": 57.91,
            "difference": 1.46
        },
        {
            "points": {
                "lat": 43.44764,
                "lng": 25.65785
            },
            "totalDistance": 59.94,
            "difference": 2.03
        },
        {
            "points": {
                "lat": 43.44743,
                "lng": 25.63267
            },
            "totalDistance": 65.55,
            "difference": 5.61
        },
        {
            "points": {
                "lat": 43.42912,
                "lng": 25.56787
            },
            "totalDistance": 70.53,
            "difference": 4.98
        },
        {
            "points": {
                "lat": 43.43058,
                "lng": 25.50621
            },
            "totalDistance": 80.05,
            "difference": 9.52
        },
        {
            "points": {
                "lat": 43.41029,
                "lng": 25.39165
            },
            "totalDistance": 82.19,
            "difference": 2.14
        },
        {
            "points": {
                "lat": 43.41617,
                "lng": 25.36645
            },
            "totalDistance": 89.11,
            "difference": 6.92
        },
        {
            "points": {
                "lat": 43.4205,
                "lng": 25.28098
            },
            "totalDistance": 96.06,
            "difference": 6.95
        },
        {
            "points": {
                "lat": 43.41918,
                "lng": 25.19489
            },
            "totalDistance": 98.3,
            "difference": 2.24
        },
        {
            "points": {
                "lat": 43.41304,
                "lng": 25.16845
            },
            "totalDistance": 100.81,
            "difference": 2.51
        },
        {
            "points": {
                "lat": 43.41796,
                "lng": 25.13813
            },
            "totalDistance": 106.52,
            "difference": 5.71
        },
        {
            "points": {
                "lat": 43.44055,
                "lng": 25.0746
            },
            "totalDistance": 110.91,
            "difference": 4.39
        },
        {
            "points": {
                "lat": 43.44544,
                "lng": 25.02059
            },
            "totalDistance": 116.02,
            "difference": 5.11
        },
        {
            "points": {
                "lat": 43.43407,
                "lng": 24.9593
            },
            "totalDistance": 125.46,
            "difference": 9.44
        },
        {
            "points": {
                "lat": 43.42196,
                "lng": 24.84359
            },
            "totalDistance": 134.49,
            "difference": 9.03
        },
        {
            "points": {
                "lat": 43.41611,
                "lng": 24.73203
            },
            "totalDistance": 136.73,
            "difference": 2.24
        },
        {
            "points": {
                "lat": 43.42601,
                "lng": 24.70789
            },
            "totalDistance": 137.08,
            "difference": 0.35
        },
        {
            "points": {
                "lat": 43.42644,
                "lng": 24.70365
            },
            "totalDistance": 137.1,
            "difference": 0.02
        },
        {
            "points": {
                "lat": 43.42643,
                "lng": 24.70345
            },
            "totalDistance": 139.38,
            "difference": 2.28
        },
        {
            "points": {
                "lat": 43.41098,
                "lng": 24.68498
            },
            "totalDistance": 141.65,
            "difference": 2.27
        },
        {
            "points": {
                "lat": 43.41311,
                "lng": 24.65699
            },
            "totalDistance": 143.93,
            "difference": 2.28
        },
        {
            "points": {
                "lat": 43.41911,
                "lng": 24.63006
            },
            "totalDistance": 144.49,
            "difference": 0.56
        },
        {
            "points": {
                "lat": 43.41818,
                "lng": 24.62324
            },
            "totalDistance": 145.13,
            "difference": 0.64
        },
        {
            "points": {
                "lat": 43.41772,
                "lng": 24.61532
            },
            "totalDistance": 145.65,
            "difference": 0.52
        }
    ]
  }

  route = this.routeFromPostman.points.map(points => Object.values(points.points).reverse())
  markers: any[] = [];

  constructor(private mapService: MapService, private officesService: OfficesService) {
  }

  async ngOnInit() {
    this.offices = await this.officesService.getAllOffices();

    if(this.offices.length > 0) {
      this.offices.forEach((office: Office) => {
        const newMarker = new mapboxgl.Marker({color:'#3366ff'})
        newMarker.setLngLat({lng: office.lng, lat: office.lat});
        newMarker.addTo(this.map)
        this.markers.push(newMarker)
      })
    }
  }

  ngAfterViewInit(): void {
    this.map = this.mapService.createMap({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v11',
    //   style: 'mapbox://styles/mapbox/streets-v12',
      center: [25.4858, 42.7339], // starting position [lng, lat]
      zoom: 6.5, // starting zoom
    });


    this.map.on('load', () => {
      this.map.addSource('route', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            coordinates: this.route
          }
        }
      }); 

      this.map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': '#00ff00',
          'line-width': 3
        }
      });
  
    })
  }

  onClick(event: any) {
    const target = event.target.closest('.mapboxgl-marker');
    if(target){
        const clickedMarker = this.markers.find(marker => marker._element === target)
        console.log(target);
        console.log(clickedMarker._lngLat);
    }
  }
}
