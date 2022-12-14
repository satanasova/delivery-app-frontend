import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { NbButtonModule, NbCardModule, NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilsModule } from '../utils/utils.module';


@NgModule({
  declarations: [
    UserProfileComponent,
    UserSignupComponent,
    UserLoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbDialogModule,
    NbCardModule,
    NbButtonModule,
    NbFormFieldModule,
    NbInputModule,
    NbIconModule,
    UtilsModule
  ]
})
export class UsersModule { }
