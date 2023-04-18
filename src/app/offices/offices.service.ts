import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Office } from './models';
import { SettingsService } from '../utils/settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class OfficesService {

  constructor(private http: HttpClient, private settingsService: SettingsService) { }

  getAllOffices(): Promise<Office[]> {
    return firstValueFrom(this.http.get<Office[]>(`${this.settingsService.getSetting('apiURL') || environment.apiURL}/offices/`))
  }

  getOffice(officeId: string): Promise<Office> {
    this.http.get<Office>(`${this.settingsService.getSetting('apiURL') || environment.apiURL}/offices/${officeId}`).subscribe((data) => {
    })
    return firstValueFrom(this.http.get<Office>(`${this.settingsService.getSetting('apiURL') || environment.apiURL}/offices/${officeId}`))
  }
}
