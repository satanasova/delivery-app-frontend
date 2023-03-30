import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit-profile',
  templateUrl: './user-edit-profile.component.html',
  styleUrls: ['./user-edit-profile.component.scss']
})
export class UserEditProfileComponent implements OnInit {
  @Output() saveClicked: EventEmitter<any> = new EventEmitter;
  @Output() closeClicked: EventEmitter<any> = new EventEmitter;
  newAvatar: File | null = null;
  avatarUrl: any;
  loggedUser: User;
  name: string;
  email: string;
  password?: string;
  confirmedPassword?: string;
  oldPassword?: string;

  constructor(public userService: UserService, private sanitizer: DomSanitizer, private toastrService: NbToastrService) { 
    this.loggedUser = (this.userService.loggedUser.value as User);
    this.name = this.loggedUser.name;
    this.email = this.loggedUser.email;
    console.log(this.loggedUser);
  }

  ngOnInit() {
    
  }  

  onSave() {
    console.log('saving...')
    this.saveClicked.emit();
    const newUserDetails: {} = {};

    if (this.avatarUrl) {
      (newUserDetails as any).avatarUrl = this.avatarUrl;
    }

    if (this.name !== this.loggedUser.name) {
      (newUserDetails as any).name = this.name;
    }

    if (this.email !== this.loggedUser.email) {
      (newUserDetails as any).email = this.email;
    }

    if (Object.keys(newUserDetails).length > 0) {
      this.userService.updateUserDetails(newUserDetails);

      const toast = this.toastrService.success(
        '', 
        'Changes saved!', 
        {position: NbGlobalPhysicalPosition.TOP_RIGHT, duration: 5000, icon: 'checkmark-outline'});
    }
  }

  onClose() {
    console.log('closing...');
    this.closeClicked.emit();
  }

  changeAvatar(files: FileList) {
    if (files.item(0)) {
      this.newAvatar = files.item(0);
      const objectURL = URL.createObjectURL(files.item(0) as Blob)
      this.avatarUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    }
  }

  togglePasswordFieldVisibility(passwordField: HTMLInputElement) {
    passwordField.type = passwordField.type === 'text' ? 'password' : 'text'
  }
}
