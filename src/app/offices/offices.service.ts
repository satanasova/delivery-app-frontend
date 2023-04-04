import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Office } from './models';

@Injectable({
  providedIn: 'root'
})
export class OfficesService {

  constructor(private http: HttpClient) { }

  getAllOffices(): Promise<Office[]> {
    return firstValueFrom(this.http.get<Office[]>(`${environment.apiURL}/offices/`))
  }

  getOffice(officeId: string): Promise<Office> {
    this.http.get<Office>(`${environment.apiURL}/offices/${officeId}`).subscribe((data) => {
    })
    return firstValueFrom(this.http.get<Office>(`${environment.apiURL}/offices/${officeId}`))
  }
}
