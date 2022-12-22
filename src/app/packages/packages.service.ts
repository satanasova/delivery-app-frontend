import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Package } from './models';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {
  allPackages: Package[] = [];

  constructor(private http: HttpClient) { }

  async getAllPackages(ignoreCache = false): Promise<Package[]> {
    if (this.allPackages.length === 0 || ignoreCache) {
      this.allPackages = (await firstValueFrom(this.http.get<Package[]>('http://localhost:3000/packages/')))
        .slice(0, 15);
    } 
    
    return this.allPackages;
  }  

  getSinglePackage(packageId: string): Promise<Package> {
    return firstValueFrom((this.http.get<Package>(`http://localhost:3000/packages/${packageId}`)))
  }
}
