import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Office } from './models';

@Injectable({
  providedIn: 'root'
})
export class OfficesService {

  constructor(private http: HttpClient) { }

  getAllOffices(): Promise<Office[]> {
    return firstValueFrom(this.http.get<Office[]>('http://localhost:3000/offices/'))
  }

  getOffice(officeId: string): Promise<Office> {
    console.log(`http://localhost:3000/offices/${officeId}`);
    this.http.get<Office>(`http://localhost:3000/offices/${officeId}`).subscribe((data) => {
      console.log('got new data', data);
    })
    return firstValueFrom(this.http.get<Office>(`http://localhost:3000/offices/${officeId}`))
  }
} 
