import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from './models';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) { }

  getAllClients(): Promise<Client[]> {

    return firstValueFrom(this.http.get<Client[]>(`${environment.apiURL}/clients/`))
  }

  getClient(clientId: string): Promise<Client> {
    return firstValueFrom(this.http.get<Client>(`${environment.apiURL}/clients/${clientId}`))
  }
}

