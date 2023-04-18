import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Delivery } from './models';
import { SettingsService } from '../utils/settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class DeliveriesService {

  constructor(private http: HttpClient, private settingsService: SettingsService) { }


  getAllDeliveries(): Promise<Delivery[]> {
    return firstValueFrom(this.http.get<Delivery[]>(`${this.settingsService.getSetting('apiURL') || environment.apiURL}/deliveries/`))
  }

  getDelivery(deliveryId: string) {
    return firstValueFrom(this.http.get<Delivery>(`${this.settingsService.getSetting('apiURL') || environment.apiURL}/deliveries/${deliveryId}`))
  }
}
