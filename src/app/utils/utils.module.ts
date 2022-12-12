import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import { NbCardModule, NbDialogModule, NbIconModule, NbRadioModule } from '@nebular/theme';
import { SettingsService } from './settings/settings.service';
import { FormsModule } from '@angular/forms';
import { PasswordVisibilityToggleDirective } from './password-visibility-toggle/password-visibility-toggle.directive';



@NgModule({
  declarations: [
    SettingsComponent,
    PasswordVisibilityToggleDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    NbDialogModule.forChild(),
    NbCardModule,
    NbRadioModule,
    NbIconModule
  ],
  exports: [
    PasswordVisibilityToggleDirective
  ]
})
export class UtilsModule { }
