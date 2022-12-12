import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.scss']
})
export class UserSignupComponent implements OnInit {
  showPassword: boolean = false;
  showRepeatedPassword: boolean = false;

  constructor() { }

  ngOnInit(): void {


  }

  // getInputType(passInput: ): string {

  // }

  togglePasswordFieldVisibility(passwordField: HTMLInputElement) {
    passwordField.type = passwordField.type === 'text' ? 'password' : 'text'
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleShowRepeatedPassword(): void {
    this.showRepeatedPassword = !this.showRepeatedPassword;
  }

  onsignup(formValue: any) {
    console.log(formValue);
  }
}
