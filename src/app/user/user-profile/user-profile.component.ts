import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { UserEditProfileComponent } from '../user-edit-profile/user-edit-profile.component';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  // user?: Promise<User | null>;
  @Output() logOutClicked: EventEmitter<any> = new EventEmitter;
  userEditProfileModal?: NbDialogRef<any>;

  constructor(private dialogService: NbDialogService, public userService: UserService) { 
    // this.user = this.userService.loggedUser
  }

  async ngOnInit() {
    
  }

  onLogout() {
    this.userService.logout();
    this.logOutClicked.emit();
  }

  onEdit() {
    this.userEditProfileModal = this.dialogService.open(UserEditProfileComponent);
    const subsciptionSave = (this.userEditProfileModal.componentRef.instance as UserEditProfileComponent).saveClicked.subscribe(() => {
      this.userEditProfileModal?.close();
      subsciptionClose.unsubscribe();
    });

    const subsciptionClose = (this.userEditProfileModal.componentRef.instance as UserEditProfileComponent).closeClicked.subscribe(() => {
      this.userEditProfileModal?.close();
      subsciptionClose.unsubscribe();
    });

    this.userEditProfileModal.onClose.subscribe(() => {
      subsciptionSave.unsubscribe();
      subsciptionClose.unsubscribe();
    })
  }


}
