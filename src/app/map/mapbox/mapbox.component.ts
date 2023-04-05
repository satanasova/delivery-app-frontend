import { AfterViewInit, Component, OnInit, Output, QueryList, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { DeliveriesService } from 'src/app/deliveries/deliveries.service';
import { DeliveryPreviewComponent } from 'src/app/deliveries/delivery-preview/delivery-preview.component';
import { Delivery, GeoPoint, PathPoint } from 'src/app/deliveries/models';
import { DrawerService } from 'src/app/drawer/drawer.service';
import { Office } from 'src/app/offices/models';
import { OfficePreviewComponent } from 'src/app/offices/office-preview/office-preview.component';
import { OfficesService } from 'src/app/offices/offices.service';
import { XPromise } from 'src/app/utils/custom-promise';
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
  mapReady: XPromise<any> = new XPromise<any>(() => {});

  mapContainerResizeObserver: ResizeObserver = new ResizeObserver(entries => {
    entries.forEach(async (entry) => {
      if (!this.drawerOpened) {
        console.log('observer');
        this.resizeMap();
        this.centerMap();
        this.hideAllRoutes();
      } else {
        console.log('drawer opened - do nothing');
      }
    })
  });

  constructor(private mapService: MapService, private officesService: OfficesService, private drawerService: DrawerService, private deliveriesService: DeliveriesService) {
    console.log('start fetching deliveries');
    this.deliveries = this.deliveriesService.getAllDeliveries() //5s
  }

  async ngOnInit() {
    this.offices = await this.officesService.getAllOffices();
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
      this.mapReady.resolve()
      if (this.offices.length > 0) {
        this.showOfficesOnMap(this.offices)
      }

      (await this.deliveries).forEach((delivery: Delivery) => {
        this.showTruckOnMap(delivery)
      });

      (await this.deliveries).map((delivery: Delivery) => {
        const routePathPoints = delivery.route.path.points;

        const routeTraveledPathPoints = routePathPoints.slice(0,routePathPoints.indexOf(delivery.lastPathPointPassed) + 1);
        const routeTraveledCoordinates = routeTraveledPathPoints.map((point: any) => [point.points.lng, point.points.lat]);
        routeTraveledCoordinates.push([delivery.truckLoc.lng, delivery.truckLoc.lat])

        const routeToGoPathPoints = routePathPoints.slice(routePathPoints.indexOf(delivery.lastPathPointPassed) + 1);
        const routeToGoCoordinates = routeToGoPathPoints.map((point: any) => [point.points.lng, point.points.lat]);
        routeToGoCoordinates.unshift([delivery.truckLoc.lng, delivery.truckLoc.lat])

        this.map.addSource(`route-traveled${delivery._id}`, {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
              'type': 'LineString',
              coordinates: routeTraveledCoordinates
              // coordinates: routeCoordinates
            }
          }
        });

        this.map.addLayer({
          'id': `route-traveled${delivery._id}`,
          'type': 'line',
          'source': `route-traveled${delivery._id}`,
          'layout': {
            'visibility': 'none',
            'line-join': 'round',
            'line-cap': 'round'
          },
          'paint': {
            'line-color': '#6E9140',
            'line-width': 3
          }
        });

        this.map.addSource(`route${delivery._id}`, {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
              'type': 'LineString',
              coordinates: routeToGoCoordinates
            }
          }
        });

        this.map.addLayer({
          'id': `route${delivery._id}`,
          'type': 'line',
          'source': `route${delivery._id}`,
          'layout': {
            'visibility': 'none',
            'line-join': 'round',
            'line-cap': 'round'
          },
          'paint': {
            'line-color': '#914531',
            'line-width': 3
          }
        });
      });

    })

    if (this.mapContainer) {
      this.mapContainerResizeObserver.observe(this.mapContainer.element.nativeElement)
    }

    this.drawerService.drawerClosed.subscribe((drawer) => this.drawerOpened = false)
  }

  async onClick(event: any) {
    const officeMarkerTarget = event.target.closest('.office-marker');
    const truckMarkerTarget = event.target.classList.contains('truck-marker') && event.target;
    // console.log(event.target);

    if (officeMarkerTarget) {
      const officeId = officeMarkerTarget.getAttribute('office-id');
      const office = this.offices.find(office => office._id === officeId);
      this.hideAllRoutes();

      this.drawerService.openDrawer(OfficePreviewComponent, { 'officeId': officeId });
      this.drawerOpened = true;

      if (office) {
        this.resizeMap();
        this.moveCenterMap([office.lng, office.lat]);
      }
    }

    if (truckMarkerTarget) {
      // console.log(truckMarkerTarget);
      const deliveryId = truckMarkerTarget.getAttribute('delivery-id');
      const delivery = (await this.deliveries).find(dl => dl._id === deliveryId)
      const truckLngLat = delivery?.truckLoc;


      this.drawerService.openDrawer(DeliveryPreviewComponent, {'deliveryId': deliveryId});
      this.drawerOpened = true;
      this.hideAllRoutes();
      this.showRouteOnMap(deliveryId);

      this.resizeMap();
      this.moveCenterMap(truckLngLat)
    }
  }

  async resizeMap() {
    await this.mapReady;

    setTimeout(() => {
      console.time('resize');
      console.log('map resized');
      this.map.resize();
    }, 0)
  }

  async centerMap() {
    await this.mapReady

    setTimeout(() => {
      this.map.flyTo({ center: [25.4858, 42.7339], zoom: 6.5 });
      console.log('map centered');
    }, 0)
  }

  async moveCenterMap(coordinates: number[]) {
    await this.mapReady

    setTimeout(() => {
      this.map.flyTo({ center: coordinates, zoom: 8 });
      console.log('map moved');
    }, 0)
  }

  calculateTruckPoint(delivery: Delivery): { truckLatLng: GeoPoint; lastPathPointPassed: {}; }  {
    let truckLatLng: GeoPoint;
    const deliveryStartDate = +new Date(delivery.departureDate);
    const now = +new Date()
    const hoursPassed = (now - deliveryStartDate) / (60*60*1000);
    const velocity = 90;
    let distancePassed = hoursPassed * velocity;
    const pathPoints = delivery.route.path.points;
    const currPathPoint = pathPoints.find((pathPoint: PathPoint) => distancePassed === pathPoint.totalDistance);
    const startPathPoint = pathPoints[0];
    const endPathPoint = pathPoints[pathPoints.length-1];
    let lastPathPointPassed = {}

    if(distancePassed < startPathPoint.totalDistance) {
      truckLatLng = startPathPoint.points;
      lastPathPointPassed = startPathPoint;
    } else if(distancePassed > endPathPoint.totalDistance) {
      truckLatLng = endPathPoint.points;
      lastPathPointPassed = endPathPoint;
      distancePassed = endPathPoint.distancePassed
    } else {
      if(currPathPoint) {
        truckLatLng = currPathPoint.points;
        lastPathPointPassed = currPathPoint;
      } else {
        const maxPathPoint: PathPoint = pathPoints.find((pathPoint: PathPoint) => pathPoint.totalDistance > distancePassed);
        const minPathPoint: PathPoint = pathPoints[pathPoints.indexOf(maxPathPoint)-1];
        lastPathPointPassed = minPathPoint;
        const totalPointsDistanceDelta = maxPathPoint.difference;
        const currentDistanceDelta = distancePassed - minPathPoint.totalDistance;
        const currentDistanceDeltaPerc = (currentDistanceDelta/totalPointsDistanceDelta);

        const totalLatDelta = maxPathPoint.points.lat - minPathPoint.points.lat;
        const totalLngDelta = maxPathPoint.points.lng - minPathPoint.points.lng;
        const truckLat = minPathPoint.points.lat + (totalLatDelta) * currentDistanceDeltaPerc;
        const truckLng = minPathPoint.points.lng + (totalLngDelta) * currentDistanceDeltaPerc;

        truckLatLng = {lat: truckLat, lng: truckLng};
      }
    }

    return {truckLatLng, lastPathPointPassed}
  }

  showOfficesOnMap(offices: Office[]) {
    offices.forEach((office: Office) => {
      const newOfficeMarker = new mapboxgl.Marker({ color: '#4E5F91' })
      newOfficeMarker.setLngLat({ lng: office.lng, lat: office.lat });
      newOfficeMarker.addTo(this.map)
      newOfficeMarker.getElement().classList.add('office-marker')
      newOfficeMarker.getElement().setAttribute('office-id', office._id);
    })
  }

  showTruckOnMap(delivery: Delivery) {
    // const truckMarkerEl = this.truckMarkers?.find(tm => tm.el.nativeElement.getAttribute('id') === delivery._id).el.nativeElement;
    const {truckLatLng, lastPathPointPassed} = this.calculateTruckPoint(delivery);

    const newTruckMarkerEl = document.createElement('div');
    newTruckMarkerEl.style.width = '27px'
    newTruckMarkerEl.style.height = '41px'
    newTruckMarkerEl.style.backgroundImage = 'url(./assets/images/truck-marker.svg)'
    newTruckMarkerEl.style.top = '-15px';
    // newTruckMarkerEl.style.position = 'relative';


    newTruckMarkerEl.classList.add('truck-marker');
    newTruckMarkerEl.setAttribute('delivery-id', delivery._id);

    const newTruckMarker = new mapboxgl.Marker(newTruckMarkerEl)
    newTruckMarker.setLngLat(truckLatLng);
    newTruckMarker.addTo(this.map);
    // newTruckMarker.getElement().classList.add('truck-marker');

    delivery.truckLoc = truckLatLng;
    delivery.lastPathPointPassed = lastPathPointPassed;
  }

  async showRouteOnMap(deliveryId: string) {
    await this.mapReady
    this.map.setLayoutProperty(`route${deliveryId}`,'visibility','visible');
    this.map.setLayoutProperty(`route-traveled${deliveryId}`,'visibility','visible')

  }

  async hideAllRoutes() {
    await this.mapReady
    const routeLayers = this.map.getStyle().layers.filter((layer: any) => layer.id.includes('route'));
    const routeTraveledLayers = this.map.getStyle().layers.filter((layer: any) => layer.id.includes('route-traveled'));

    if(routeLayers){
      routeLayers.forEach((layer: any) => {
        // console.log(layer);
        this.map.setLayoutProperty(layer.id,'visibility','none')
      });
    }

    if(routeTraveledLayers){
      routeTraveledLayers.forEach((layer: any) => {
        // console.log(layer);
        this.map.setLayoutProperty(layer.id,'visibility','none')
      });
    }
  }

}
