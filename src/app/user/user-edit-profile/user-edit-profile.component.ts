import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit-profile',
  templateUrl: './user-edit-profile.component.html',
  styleUrls: ['./user-edit-profile.component.scss']
})
export class UserEditProfileComponent implements OnInit {
  newAvatar: File | null = null;
  newAvatarUrl: any;

  constructor(public userService: UserService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  onSave() {
    console.log('saving...')
    this.userService.postNewProfilePicture(this.newAvatar as File);
  }

  onClose() {
    console.log('closing...')
  }

  changeAvatar(files: FileList) {
    if (files.item(0)) {
      this.newAvatar = files.item(0);
      const objectURL = URL.createObjectURL(files.item(0) as Blob)
      this.newAvatarUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    }
  }
}
