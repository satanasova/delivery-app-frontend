import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { XPromise } from '../utils/custom-promise';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { User } from './user.model';
import { UsersModule } from './user.module';
import { SettingsService } from '../utils/settings/settings.service';

@Injectable()
export class UserService {
  loggedUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  authToken?: string;
  http: HttpClient;
  userData = {
  }


  constructor(private httpBackend: HttpBackend, private settingsService: SettingsService) {
    this.http = new HttpClient(httpBackend);
    // this.loggedUser = this.getLoggedInUser();
    this.fetchUserFromStorage();
  }

  fetchUserFromStorage() {
    // TODO: try to get logged user from localStorage and if the token has not expired - push it in the behaviour subject
    // this.loggedUser?.next(userHaci)
    this.http.get(`${this.settingsService.getSetting('apiURL') || environment.apiURL}/api/request-info`).subscribe(data => console.log(data))
  }

  login(email: any, password: any) {
    const loginResponse = new Promise<object | string>((res, rej) => {
      if (Math.random() < 0.5) {
        //TODO get user and token ?
        const userData = {
          user: { id: '24', name: 'Pecka Shmecka', email, avatarUrl: 'https://ih1.redbubble.net/image.2253860100.5603/poster,504x498,f8f8f8-pad,600x600,f8f8f8.jpg' },
          token: `${email.split('@')[0]}#10010${Math.round(Math.random() * 100)}`
        }

        this.loggedUser.next(userData.user);
        this.authToken = userData.token;
        res(this.userData)
      } else {
        rej('wrong pass')
      }
    })

    // const loginResult = await loginResponse
    // console.log(loginResponse);

    return loginResponse
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

  updateUserDetails({...details}) {
    console.log(details);
    const user = this.loggedUser.value;
    if (user) {
      Object.keys(details).forEach((key: string) => {
        (user as any)[key] = details[key]
      })
      this.loggedUser.next(user);
    }


    console.log('changing details of current user');
    // TODO
    // post new details to some endpoint
  }

}


