import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from './models';
import { SettingsService } from '../utils/settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient, private settingsService: SettingsService) { }

  getAllClients(): Promise<Client[]> {

    return firstValueFrom(this.http.get<Client[]>(`${this.settingsService.getSetting('apiURL') || environment.apiURL}/clients/`))
  }

  getClient(clientId: string): Promise<Client> {
    return firstValueFrom(this.http.get<Client>(`${this.settingsService.getSetting('apiURL') || environment.apiURL}/clients/${clientId}`))
  }
}

