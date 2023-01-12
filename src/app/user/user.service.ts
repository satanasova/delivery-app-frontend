import { Injectable } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { User } from './user.model';
import { UsersModule } from './user.module';

@Injectable()
export class UserService {
  loggedUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);


  constructor() {
    // this.loggedUser = this.getLoggedInUser();
    this.fetchLoggedUser();
  }

  fetchLoggedUser() {
    const userHaci: User = {id:'23', name: 'Haci Hacev', email: 'hackohackob@gmail.com', avatarUrl: 'https://ih1.redbubble.net/image.2253860100.5603/poster,504x498,f8f8f8-pad,600x600,f8f8f8.jpg'};
    this.loggedUser?.next(userHaci)
  }

  login(username: any, password: any) {
    console.log('login for user', username, password);
    // http request
    // get user
    // this.loggedUser.next(user)
  }

  register(email: any, name: any, password: any) {
    console.log('registering user', email, name, password)
    // regiseredUser
    // login(registeredUser)
  }

  logout() {
    // this.loggedUser = undefined;
    this.loggedUser.next(null);
    // this.userProfileModal?.close()
  }

  changeProfileImage(image: any) {
    console.log('changing image of current user')
  }

}


