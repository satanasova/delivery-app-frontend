import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Office } from 'src/app/offices/models';
import { OfficesService } from 'src/app/offices/offices.service';
import { Package, PackageStatus } from 'src/app/packages/models';
import { PackagesService } from 'src/app/packages/packages.service';

@Component({
  selector: 'app-office-preview',
  templateUrl: './office-preview.component.html',
  styleUrls: ['./office-preview.component.scss']
})
export class OfficePreviewComponent implements OnInit, OnChanges  {
  @Input() officeId?: string;
  office?: Office;
  packages?: Package[];
  receivedPackages: Package[] = [];
  deliveredPackages: Package[] = [];

  constructor(private officesService: OfficesService, private pkgService: PackagesService, private router: Router) {
    // console.log(this.officeId);
  }

  async ngOnInit() {

  }

  async ngOnChanges(changes: SimpleChanges) {
    if(this.officeId) {
      this.office = await this.officesService.getOffice(this.officeId);
      this.packages = await this.pkgService.getPackagesInOffice(this.officeId);
      this.receivedPackages = this.packages.filter((pkg: Package) => pkg.status === PackageStatus.RECEIVED);
      this.deliveredPackages = this.packages.filter((pkg: Package) => pkg.status === PackageStatus.DELIVERED);
      // console.log(this.receivedPackages);
      // console.log(this.deliveredPackages);
    }

    if(this.office) {
      // const packagesIds: string[] = this.office.packages.map(pkgID => pkgID.toString());
      const packagesIds = [
        '63c16f3014f965051f0746d2',
        '63c16f3114f965051f0747ce',
        '63c16f3114f965051f07481c',
        '63c16f3014f965051f0746d2',
        '63c16f3114f965051f0747ce',
        '63c16f3114f965051f07481c',
        '63c16f3114f965051f07481c',
        '63c16f3114f965051f07481c',
        '63c16f3114f965051f07481c'
      ]

      // this.packages = await Promise.all(packagesIds.map((pkgId) => {
      //   return this.pkgService.getSinglePackage(pkgId)
      // }));

     
    }
  }

  onPkgClicked(pkg: Package) {
    this.router.navigate(['packages', pkg._id])
  }

}
