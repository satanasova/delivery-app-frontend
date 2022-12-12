import { Injectable } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { User } from './user.model';
import { UsersModule } from './user.module';

@Injectable({
  providedIn: UsersModule
})
export class UserService {
  loggedUser?: Promise<User | null>;
  userProfileModal?: NbDialogRef<any>;
  userLoginModal?: NbDialogRef<any>;
  userSignupModal?: NbDialogRef<any>;

  constructor(private dialogService: NbDialogService) {
    this.loggedUser = this.getLoggedInUser();
  }

  getLoggedInUser() {
    return new Promise<User | null>((res,rej) => {
      setTimeout(() => {
        if (Math.random() > 1) {
          res({id:'23', name: 'Haci Hacev', email: 'hackohackob@gmail.com', avatarUrl: 'https://ih1.redbubble.net/image.2253860100.5603/poster,504x498,f8f8f8-pad,600x600,f8f8f8.jpg'})
        } else {
          res(null)
        }
      }, 100)
    });
  }

  login(username: any, password: any) {
    console.log('login for user', username, password);
  }

  register(username: any, password: any) {
    console.log('registering user', username, password)
  }

  logout() {
    this.loggedUser = undefined;
    this.userProfileModal?.close()
  }

  changeProfileImage(image: any) {
    console.log('changing image of current user')
  }

  openUserProfileModal(e: Event) {
    console.log(e.target);
    this.userProfileModal = this.dialogService.open(UserProfileComponent, {autoFocus: false});
  }

  openLoginModal() {
    this.userLoginModal = this.dialogService.open(UserLoginComponent);
  }

  openSignupModal() {
    this.userSignupModal = this.dialogService.open(UserSignupComponent);
  }
}


