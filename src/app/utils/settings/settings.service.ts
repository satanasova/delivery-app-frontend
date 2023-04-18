import { Injectable } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { BehaviorSubject } from 'rxjs';
import { UtilsModule } from '../utils.module';
import { SettingsComponent } from './settings.component';

@Injectable({
  providedIn: UtilsModule
})
export class SettingsService {
  settingsObs: BehaviorSubject<any> = new BehaviorSubject({theme: 'dark'});

  constructor(private dialogService: NbDialogService) {
    const savedSettings = localStorage.getItem('settings');
    if(savedSettings && Object.entries(JSON.parse(savedSettings)).length > 0) {
      this.settingsObs.next(JSON.parse(savedSettings));
    }
    
    this.settingsObs.subscribe((settings) => {
      localStorage.setItem('settings', JSON.stringify(settings));
    })
  }

  openSettingsModal(): void {
    this.dialogService.open(SettingsComponent)
  }

  getSetting(key: string): any {
    return (this.settingsObs.value as any)[key];
  }

  saveSetting(key: string, value: any) {
    const currentSettings = this.settingsObs.value;
    currentSettings[key] = value;
    this.settingsObs.next(currentSettings);
  }

  clearSettings() {
    localStorage.removeItem('settings');
  }

  onSettingsChanged(callback: (settings: any) => void) {
    this.settingsObs.subscribe(callback);
  }
}
