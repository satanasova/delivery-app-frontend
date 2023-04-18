import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  themeOptions: any[] = [
    { value: 'dark', label: 'Dark Theme' },
    { value: 'default', label: 'Light Theme' }
  ];

  languageOptions: any[] = [
    { value: 'bg', label: 'Bulgarian'},
    { value: 'eng', label: 'English'}
  ];

  langOption?: any;
  private _themeOption?: any;
  private _apiURL: any;

  constructor(private settingsService: SettingsService) { 
    this.settingsService.onSettingsChanged((settings) => {
      console.log('settings changed');
      this._themeOption = settings.theme;
      this._apiURL = settings.apiURL
    })

  }

  get themeOption() {
    // console.log('GET themeOption');
    return this._themeOption;
  }

  set themeOption(value) {
    // console.log('SET themeOption');
    this.settingsService.saveSetting('theme', value)
  }

  get apiURL() {
    return this._apiURL;
  }

  set apiURL(value) {
    this._apiURL = value
  }


  ngOnInit(): void {
    this.langOption = 'eng' // TODO get it from local storage
  }

  changeUrl() {
    this.settingsService.saveSetting('apiURL', this._apiURL)
  }
}

