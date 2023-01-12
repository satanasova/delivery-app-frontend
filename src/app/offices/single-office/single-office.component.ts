import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbAccordionComponent } from '@nebular/theme';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Package } from 'src/app/packages/models';
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

  constructor(private route: ActivatedRoute, private officesService: OfficesService, private router: Router) {
    this.route.params.subscribe(async ({ officeId }) => {
      if (officeId) {
        this.office = await this.officesService.getOffice(officeId);
      }
    })

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
        key: 'packages',
        header: 'Packages',
        customDisplayCmp: CustomAccordionComponent,
        cmpProperties: (packages: Package[], office: Office): any => {
          return {
            header: `${packages.length} Packages`,
            items: packages,
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

  ngOnInit(): void {
  }

}
