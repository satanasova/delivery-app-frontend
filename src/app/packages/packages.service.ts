import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { firstValueFrom } from 'rxjs';
import { CreatePackageComponent } from './create-package/create-package.component';
import { Package } from './models';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {
  allPackages: Package[] = [];
  createPackageModal?: NbDialogRef<any>

  constructor(private http: HttpClient, private dialogService: NbDialogService) { }

  async getAllPackages(ignoreCache = false): Promise<Package[]> {
    // if (this.allPackages.length === 0 || ignoreCache) {
      this.allPackages = (await firstValueFrom(this.http.get<Package[]>('http://localhost:3000/packages/')));
    // } 
    
    return this.allPackages;
  }  

  getSinglePackage(packageId: string): Promise<Package> {
    return firstValueFrom((this.http.get<Package>(`http://localhost:3000/packages/${packageId}`)))
  }

  getPackagesInOffice(officeId: string): Promise<Package[]> {
    return firstValueFrom((this.http.get<Package[]>(`http://localhost:3000/packages/in-office/${officeId}`)))
  }

  openCreatePackageModal() {
    this.createPackageModal = this.dialogService.open(CreatePackageComponent)
  }

  createPackage(pkg: any) {
    this.http.post('http://localhost:3000/packages/', pkg).subscribe(data => console.log(data))
  }
}
