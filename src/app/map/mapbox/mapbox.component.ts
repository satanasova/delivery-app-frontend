import { AfterViewInit, Component, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { DeliveriesService } from 'src/app/deliveries/deliveries.service';
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
        const newMarker = new mapboxgl.Marker({ color: '#3366ff' })
        newMarker.setLngLat({ lng: office.lng, lat: office.lat });
        newMarker.addTo(this.map)
        newMarker.getElement().setAttribute('office-id', office._id);
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
        const truckMarker = new mapboxgl.Marker({color: '#ff0000'});
        truckMarker.setLngLat(this.calculateTruckPoints(delivery));
        truckMarker.addTo(this.map);
        truckMarker.getElement().setAttribute('delivery-id', delivery._id);
      })

    })

    if (this.mapContainer) {
      this.mapContainerResizeObserver.observe(this.mapContainer.element.nativeElement)
    }

    this.drawerService.drawerClosed.subscribe((drawer) => this.drawerOpened = false)
  }

  onClick(event: any) {
    const markerTarget = event.target.closest('.mapboxgl-marker');
    if (markerTarget) {
      const officeId = markerTarget.getAttribute('office-id');
      const office = this.offices.find(office => office._id === officeId);

      this.drawerService.openDrawer(OfficePreviewComponent, { 'officeId': officeId });
      this.drawerOpened = true;

      if (office) {
        this.resizeMap();
        this.moveCenterMap([office.lng, office.lat]);
      }
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

  calculateTruckPoints(delivery: Delivery): GeoPoint  {
    console.log('calculate');
    console.log(delivery);

    const deliveryStartDate = + new Date(delivery.departureDate) + 2*60*60*100
    const now = + new Date()
    const hoursPassed = (now - deliveryStartDate) / (60*60*1000);
    console.log('delivery started', new Date(deliveryStartDate));
    console.log('now', new Date(now));
    console.log('timepast', hoursPassed);

    const velocity = 120;
    const distancePassed = hoursPassed * velocity;
    console.log('distance past', distancePassed);

    const pathPoints = delivery.route.path.points
    // const startPathPoint: PathPoint = pathPoints.find((pathPoint: PathPoint, idx: number) => pathPoint.totalDistance > distancePassed);
    const endPathPoint: PathPoint = pathPoints.find((pathPoint: PathPoint) => pathPoint.totalDistance > distancePassed);
    const startPathPoint: PathPoint = pathPoints[pathPoints.indexOf(endPathPoint)-1]
    const pathPointsDistance = endPathPoint.difference;
    const distancePassedIntoPathPoints = distancePassed - startPathPoint.totalDistance;
    const distancePassedPerc = (distancePassedIntoPathPoints/pathPointsDistance)
    console.log(startPathPoint,endPathPoint);
    console.log('distance between two path points', pathPointsDistance);
    console.log('distance passed into two path points', distancePassedIntoPathPoints);
    console.log(distancePassedPerc);

    const truckMarkerLat = startPathPoint.points.lat + (endPathPoint.points.lat - startPathPoint.points.lat) * distancePassedPerc
    const truckMarkerLng = startPathPoint.points.lng + (endPathPoint.points.lng - startPathPoint.points.lng) * distancePassedPerc
    console.log(truckMarkerLng, truckMarkerLat);
    
    return {lat: truckMarkerLat, lng: truckMarkerLng}
  }
}
