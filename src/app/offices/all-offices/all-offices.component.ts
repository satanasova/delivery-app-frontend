import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/utils/settings/settings.service';
import { Office } from '../models';
import { OfficesService } from '../offices.service';

@Component({
  selector: 'app-all-offices',
  templateUrl: './all-offices.component.html',
  styleUrls: ['./all-offices.component.scss']
})
export class AllOfficesComponent implements OnInit {
  offices: Office[] = [];
  cols: any[] = [];

  constructor(private settingsService: SettingsService,
    private officesService: OfficesService) { }

  async ngOnInit() {
    this.offices = await this.officesService.getAllOffices();

    this.cols = [
      {field: '_id', header: '#'},
      {field: 'name', header: 'Name'},
      {field: 'address', header: 'Address'},
      {field: 'phone', header: 'Phone'},
      {field: 'packages', header: 'Packages', displayFn: (pkgs: any[]): string => `${pkgs.length} Package${pkgs.length != 1 ? 's' : ''}`}
    ]
  }

  getValue(propConfig: any, office: any) {
    const customDisplayFn = propConfig && propConfig.displayFn;
    if (customDisplayFn) {
      return customDisplayFn(office[propConfig.field], office)
    } else {
      return office[propConfig.field];
    }
  }


}
