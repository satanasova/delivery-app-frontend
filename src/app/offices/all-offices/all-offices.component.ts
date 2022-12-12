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

  constructor(private settingsService: SettingsService,
    private officesService: OfficesService) { }

  async ngOnInit() {
    this.offices = await this.officesService.getAllOffices();

    const currentTheme = this.settingsService.getSetting('theme')
    console.log('currentTheme is ', currentTheme)
    this.settingsService.onSettingsChanged((settings) => {
      console.log('settings have changed!');
      console.log('new theme: ', settings.theme);
    })
  }


}
