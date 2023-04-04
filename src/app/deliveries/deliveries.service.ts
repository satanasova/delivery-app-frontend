import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Delivery } from './models';

@Injectable({
  providedIn: 'root'
})
export class DeliveriesService {

  constructor(private http: HttpClient) { }


  getAllDeliveries(): Promise<Delivery[]> {
    return firstValueFrom(this.http.get<Delivery[]>(`${environment.apiURL}/deliveries/`))
  }

  getDelivery(deliveryId: string) {
    return firstValueFrom(this.http.get<Delivery>(`${environment.apiURL}/deliveries/${deliveryId}`))
  }
}
