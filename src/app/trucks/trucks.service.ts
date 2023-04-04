import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Truck } from './models';

@Injectable({
  providedIn: 'root'
})
export class TrucksService {
  allTrucks: Truck[] = [];

  constructor(private http: HttpClient) { }

  async getAllTrucks() {
    this.allTrucks = await firstValueFrom(this.http.get<Truck[]>(`${environment.apiURL}/trucks/`));

    return this.allTrucks;
  }

  getSingleTruck(truckId: string): Promise<Truck> {
    return firstValueFrom(this.http.get<Truck>(`${environment.apiURL}/trucks/${truckId}`));
  }
}
