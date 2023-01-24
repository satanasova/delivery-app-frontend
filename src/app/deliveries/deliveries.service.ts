import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Delivery } from './models';

@Injectable({
  providedIn: 'root'
})
export class DeliveriesService {

  constructor(private http: HttpClient) { }
  

  getAllDeliveries(): Promise<Delivery[]> {
    return  firstValueFrom(this.http.get<Delivery[]>('http://localhost:3000/deliveries/'))
  }
}
