import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import { NbCardModule, NbDialogModule, NbIconModule, NbRadioModule } from '@nebular/theme';
import { SettingsService } from './settings/settings.service';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NbDialogModule.forChild(),
    NbCardModule,
    NbRadioModule,
    NbIconModule
  ]
})
export class UtilsModule { }
