import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  showPassword: boolean = false;
  // username: string = '';
  // password: string = '';

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

  getInputType(): string {
    return this.showPassword ? 'text' : 'password'
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword
  }

  onSignup(): void {
    this.userService.userLoginModal?.close();
    this.userService.openSignupModal();
  }

  onlogin(formValue: any) {
    console.log(formValue);
  }

}
