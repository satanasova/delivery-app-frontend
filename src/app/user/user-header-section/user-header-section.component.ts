import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { UserLoginComponent } from '../user-login/user-login.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { UserSignupComponent } from '../user-signup/user-signup.component';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-header-section',
  templateUrl: './user-header-section.component.html',
  styleUrls: ['./user-header-section.component.scss']
})
export class UserHeaderSectionComponent implements OnInit {
  user?: User | null;
  userProfileModal?: NbDialogRef<any>;
  userLoginModal?: NbDialogRef<any>;
  userSignupModal?: NbDialogRef<any>;

  constructor(private dialogService: NbDialogService, private userService: UserService) { }

  ngOnInit() {
    this.userService.loggedUser.subscribe(loggedUser => this.user = loggedUser);
  }


  openUserProfileModal() {
    this.userProfileModal = this.dialogService.open(UserProfileComponent, {autoFocus: false});
    const subsciption = (this.userProfileModal.componentRef.instance as UserProfileComponent).logOutClicked.subscribe(() => {
      this.userProfileModal?.close();
      subsciption.unsubscribe();
    });
    this.userProfileModal.onClose.subscribe(() => {
      subsciption.unsubscribe();
    })
  }

  openLoginModal() {
    this.userLoginModal = this.dialogService.open(UserLoginComponent);
    const subsciption = (this.userLoginModal.componentRef.instance as UserLoginComponent).signUpClicked.subscribe(() => {
      this.userLoginModal?.close();
      this.openSignupModal();
      subsciption.unsubscribe();
    })
    this.userLoginModal.onClose.subscribe(() => {
      subsciption.unsubscribe();
    })
  }

  openSignupModal() {
    this.userSignupModal = this.dialogService.open(UserSignupComponent);
    const subsciption = (this.userSignupModal.componentRef.instance as UserSignupComponent).logInClicked.subscribe(() => {
      this.userSignupModal?.close();
      this.openLoginModal();
      subsciption.unsubscribe();
    })
    this.userSignupModal.onClose.subscribe(() => {
      subsciption.unsubscribe();
    })
  }

}
