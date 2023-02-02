import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbAccordionComponent } from '@nebular/theme';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Package, PackageStatus } from 'src/app/packages/models';
import { PackagesService } from 'src/app/packages/packages.service';
import { CustomAccordionComponent } from 'src/app/utils/custom-accordion/custom-accordion.component';
import { ItemConfig } from 'src/app/utils/display-item-card/models';
import { Office } from '../models';
import { OfficesService } from '../offices.service';

@Component({
  selector: 'app-single-office',
  templateUrl: './single-office.component.html',
  styleUrls: ['./single-office.component.scss']
})
export class SingleOfficeComponent implements OnInit {
  office?: Office;
  itemConfig: ItemConfig[] = [];
  // receivedPackages: Package[] = [];
  // deliveredPackages: Package[] = [];

  constructor(private route: ActivatedRoute, private officesService: OfficesService, private pkgService: PackagesService, private router: Router) {
    this.route.params.subscribe(async ({ officeId }) => {
      if (officeId) {
        this.office = await this.officesService.getOffice(officeId);
        this.office.realPackages = await this.pkgService.getPackagesInOffice(officeId);

        // this.receivedPackages = this.office.realPackages.filter((pkg: Package) => pkg.status === PackageStatus.RECEIVED);
        // this.deliveredPackages = this.office.realPackages.filter((pkg: Package) => pkg.status === PackageStatus.DELIVERED);
        console.log('pkgs ready');
      }
    })

  }

  ngOnInit(): void {
    this.itemConfig = [
      {
        key: '_id',
        header: 'ID'
      },
      {
        key: 'name',
        header: 'Name'
      },
      {
        key: 'address',
        header: 'Address'
      },
      {
        key: 'realPackages',
        header: 'Received Packages',
        customDisplayCmp: CustomAccordionComponent,
        cmpProperties: (packages: Package[], office: Office): any => {
          const receivedPackages = packages.filter((pkg: Package) => pkg.status === PackageStatus.RECEIVED)
          return {
            header: `${receivedPackages.length || 0} Packages`,
            items: receivedPackages && receivedPackages.map(pkg => pkg._id),
            class: 'value-list'
          }
        },
        cmpHandlers: (packages: Package[], office: Office) => {
          return {
            itemClicked: (pkgId: any) => {
              this.router.navigate(['packages', pkgId])
            }
          }
        }
      },
      {
        key: 'realPackages',
        header: 'Delivered Packages',
        customDisplayCmp: CustomAccordionComponent,
        cmpProperties: (packages: Package[], office: Office): any => {
          const deliveredPackages = packages.filter((pkg: Package) => pkg.status === PackageStatus.DELIVERED)
          return {
            header: `${deliveredPackages.length || 0} Packages`,
            items: deliveredPackages && deliveredPackages.map(pkg => pkg._id),
            class: 'value-list'
          }
        },
        cmpHandlers: (packages: Package[], office: Office) => {
          return {
            itemClicked: (pkgId: any) => {
              this.router.navigate(['packages', pkgId])
            }
          }
        }
      },
      // {
      //   key:'packages',
      //   header: 'Packages Accordion',
      //   customDisplayCmp: CustomAccordionComponent,
      //   cmpProperties: (packages: any): any => {
      //     return {
      //       header: `${packages.length} Packages`,
      //       items: packages.map((pkg: Package) => pkg._id)
      //     }
      //   }
      //   // customComponent: CustomAccordionComponent,
      //   // getComponentProperties: (packages, office) => {
      //   //   return {
      //   //     header: office.name + ' ' + packages.length,
      //   //     items: packages.map(package => package._id)
      //   //   }
      //   // }
      // }

    ]

  }

}
