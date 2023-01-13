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
    this.http.get<Office>(`http://localhost:3000/offices/${officeId}`).subscribe((data) => {
    })
    return firstValueFrom(this.http.get<Office>(`http://localhost:3000/offices/${officeId}`))
  }
} 
