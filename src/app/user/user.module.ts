import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { NbButtonModule, NbCardModule, NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule, NbUserModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilsModule } from '../utils/utils.module';
import { UserHeaderSectionComponent } from './user-header-section/user-header-section.component';
import { UserService } from './user.service';
import { UserEditProfileComponent } from './user-edit-profile/user-edit-profile.component';


@NgModule({
  declarations: [
    UserHeaderSectionComponent,
    UserProfileComponent,
    UserSignupComponent,
    UserLoginComponent,
    UserEditProfileComponent,
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
    UtilsModule,
    NbDialogModule,
    NbUserModule
  ],
  exports: [UserHeaderSectionComponent],
  providers: [UserService],
})
export class UsersModule { }
