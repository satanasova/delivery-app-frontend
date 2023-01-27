import { AfterViewInit, Component, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { DeliveriesService } from 'src/app/deliveries/deliveries.service';
import { DeliveryPreviewComponent } from 'src/app/deliveries/delivery-preview/delivery-preview.component';
import { Delivery, GeoPoint, PathPoint } from 'src/app/deliveries/models';
import { DrawerService } from 'src/app/drawer/drawer.service';
import { Office } from 'src/app/offices/models';
import { OfficePreviewComponent } from 'src/app/offices/office-preview/office-preview.component';
import { OfficesService } from 'src/app/offices/offices.service';
import { MapService } from '../map.service';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.scss']
})
export class MapboxComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', { read: ViewContainerRef }) mapContainer?: ViewContainerRef;
  map: any;
  offices: Office[] = [];
  deliveries: Promise<Delivery[]>;
  drawerOpened: boolean = false;
  mapContainerResizeObserver: ResizeObserver = new ResizeObserver(entries => {
    entries.forEach(entry => {
      if (!this.drawerOpened) {
        this.resizeMap();
        this.centerMap();
      } else {
        this.resizeMap();
      }
    })
  });


  constructor(private mapService: MapService, private officesService: OfficesService, private drawerService: DrawerService, private deliveriesService: DeliveriesService) {
    console.log('start fetching deliveries');
    this.deliveries = this.deliveriesService.getAllDeliveries() //5s
  }

  async ngOnInit() {
    this.offices = await this.officesService.getAllOffices();


    if (this.offices.length > 0) {
      this.offices.forEach((office: Office) => {
        const newOfficeMarker = new mapboxgl.Marker({ color: '#3366ff' })
        newOfficeMarker.setLngLat({ lng: office.lng, lat: office.lat });
        newOfficeMarker.addTo(this.map)
        newOfficeMarker.getElement().classList.add('office-marker')
        newOfficeMarker.getElement().setAttribute('office-id', office._id);
      })
    }
  }

  async ngAfterViewInit() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v11',
      //   style: 'mapbox://styles/mapbox/streets-v12',
      center: [25.4858, 42.7339], // starting position [lng, lat]
      zoom: 6.5, // starting zoom
    });

    this.map.on('load', async () => {
      console.log('map loaded');
      await this.deliveries;
      console.log('deliveries loaded');

      const routes = (await this.deliveries).map((delivery: Delivery) => {
        // {points: {lat:13,lng:12}, desdf}
        return delivery.route.path.points.map((point: any) => [point.points.lng, point.points.lat])
      });

      routes.forEach((route: any[], idx) => {
        this.map.addSource(`route${idx}`, {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
              'type': 'LineString',
              coordinates: route
            }
          }
        });
  
        this.map.addLayer({
          'id': `route${idx}`,
          'type': 'line',
          'source': `route${idx}`,
          'layout': {
            'line-join': 'round',
            'line-cap': 'round'
          },
          'paint': {
            'line-color': '#00ff00',
            'line-width': 3
          }
        });
      });

      (await this.deliveries).forEach((delivery: Delivery) => {
        const newTruckMarker = new mapboxgl.Marker({color: '#ff0000'});
        const newTruckMarkerLngLat = this.calculateTruckPoint(delivery);
        newTruckMarker.setLngLat(newTruckMarkerLngLat);
        newTruckMarker.addTo(this.map);
        newTruckMarker.getElement().classList.add('truck-marker');
        newTruckMarker.getElement().setAttribute('delivery-id', delivery._id);
        newTruckMarker.getElement().setAttribute('truck-location', JSON.stringify(newTruckMarkerLngLat));
      })

    })

    if (this.mapContainer) {
      this.mapContainerResizeObserver.observe(this.mapContainer.element.nativeElement)
    }

    this.drawerService.drawerClosed.subscribe((drawer) => this.drawerOpened = false)
  }

  onClick(event: any) {
    const officeMarkerTarget = event.target.closest('.office-marker');
    const truckMarkerTarget = event.target.closest('.truck-marker');

    if (officeMarkerTarget) {
      const officeId = officeMarkerTarget.getAttribute('office-id');
      const office = this.offices.find(office => office._id === officeId);

      this.drawerService.openDrawer(OfficePreviewComponent, { 'officeId': officeId });
      this.drawerOpened = true;

      if (office) {
        this.resizeMap();
        this.moveCenterMap([office.lng, office.lat]);
      }
    }

    if (truckMarkerTarget) {
      const deliveryId = truckMarkerTarget.getAttribute('delivery-id');
      const truckLngLat = JSON.parse(truckMarkerTarget.getAttribute('truck-location'));
      
      this.drawerService.openDrawer(DeliveryPreviewComponent, {'deliveryId': deliveryId});
      this.drawerOpened = true;

      console.log(truckMarkerTarget);

      this.resizeMap();
      this.moveCenterMap(truckLngLat)
    }
  }

  resizeMap() {
    setTimeout(() => {
      this.map.resize();
    }, 0);
  }

  centerMap() {
    setTimeout(() => {
      this.map.flyTo({ center: [25.4858, 42.7339] });
    }, 0)
  }

  moveCenterMap(coordinates: number[]) {
    setTimeout(() => {
      this.map.flyTo({ center: coordinates });
    }, 0)
  }

  calculateTruckPoint(delivery: Delivery): GeoPoint  {
    let truckLatLng: GeoPoint;
    const deliveryStartDate = +new Date(delivery.departureDate);
    const now = +new Date()
    const hoursPassed = (now - deliveryStartDate) / (60*60*1000);
    const velocity = 90;
    const distancePassed = hoursPassed * velocity;
    const pathPoints = delivery.route.path.points;
    const currPathPoint = pathPoints.find((pathPoint: PathPoint) => distancePassed === pathPoint.totalDistance);
    const startPathPoint = pathPoints[0];
    const endPathPoint = pathPoints[pathPoints.length-1];

    if(distancePassed < startPathPoint.totalDistance) {
      truckLatLng = startPathPoint.points;
    } else if(distancePassed > endPathPoint.totalDistance) {
      truckLatLng = endPathPoint.points
    } else {
      if(currPathPoint) {
        truckLatLng = currPathPoint.points
      } else {
        const maxPathPoint: PathPoint = pathPoints.find((pathPoint: PathPoint) => pathPoint.totalDistance > distancePassed);
        const minPathPoint: PathPoint = pathPoints[pathPoints.indexOf(maxPathPoint)-1]
        const totalPointsDistanceDelta = maxPathPoint.difference;
        const currentDistanceDelta = distancePassed - minPathPoint.totalDistance;
        const currentDistanceDeltaPerc = (currentDistanceDelta/totalPointsDistanceDelta)
  
        const totalLatDelta = maxPathPoint.points.lat - minPathPoint.points.lat;
        const totalLngDelta = maxPathPoint.points.lng - minPathPoint.points.lng;
        const truckLat = minPathPoint.points.lat + (totalLatDelta) * currentDistanceDeltaPerc
        const truckLng = minPathPoint.points.lng + (totalLngDelta) * currentDistanceDeltaPerc
        
        truckLatLng = {lat: truckLat, lng: truckLng}
      }
    }
    
    return truckLatLng
  }
}
