import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  showPassword: boolean = false;
  loginForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;


  constructor(private fb: FormBuilder, public userService: UserService) {
    this.loginForm = this.fb.group({
      'email': ['', Validators.compose([
        Validators.required, Validators.email,
      ])],
      'password': ['', Validators.compose([
        Validators.required, Validators.minLength(6)
      ])]
    });

    this.email = this.loginForm.controls['email'];
    this.password = this.loginForm.controls['password'];
  }

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
