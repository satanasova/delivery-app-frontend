import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  // user?: Promise<User | null>;

  constructor(public userService: UserService) { 
    // this.user = this.userService.loggedUser
  }

  async ngOnInit() {
    
  }


}
