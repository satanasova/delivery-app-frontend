import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';

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
    { value: 'bg', label: 'Bulgarian', checked: true},
    { value: 'eng', label: 'English'}
  ];
  langOption?: any;
  private _themeOption?: any

  constructor(private settingsService: SettingsService) { 
    this.settingsService.onSettingsChanged((settings) => {
      this._themeOption = settings.theme;
    })
  }

  get themeOption() {
    console.log('GET themeOption');
    return this._themeOption;
  }

  set themeOption(value) {
    console.log('SET themeOption');
    this.settingsService.saveSetting('theme', value)
  }

  ngOnInit(): void {
  }
}

