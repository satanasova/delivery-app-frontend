import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreatePackageComponent } from './create-package/create-package.component';
import { Package } from './models';
import { SettingsService } from '../utils/settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {
  allPackages: Package[] = [];
  createPackageModal?: NbDialogRef<any>

  constructor(private http: HttpClient, private dialogService: NbDialogService, private settingsService: SettingsService) { }

  async getAllPackages(ignoreCache = false): Promise<Package[]> {
    // if (this.allPackages.length === 0 || ignoreCache) {
      this.allPackages = await firstValueFrom(this.http.get<Package[]>(`${this.settingsService.getSetting('apiURL') || environment.apiURL}/packages/`));
    // }

    return this.allPackages;
  }

  getSinglePackage(packageId: string): Promise<Package> {
    return firstValueFrom((this.http.get<Package>(`${this.settingsService.getSetting('apiURL') || environment.apiURL}/packages/${packageId}`)))
  }

  getPackagesInOffice(officeId: string): Promise<Package[]> {
    return firstValueFrom((this.http.get<Package[]>(`${this.settingsService.getSetting('apiURL') || environment.apiURL}/packages/in-office/${officeId}`)))
  }

  openCreatePackageModal() {
    this.createPackageModal = this.dialogService.open(CreatePackageComponent)
  }

  closeCreatePackageModal() {
    this.createPackageModal?.close();
  }

  createPackage(pkg: any): Promise<Package> {
    return firstValueFrom(this.http.post<Package>(`${this.settingsService.getSetting('apiURL') || environment.apiURL}/packages/`, pkg));

  }
}
