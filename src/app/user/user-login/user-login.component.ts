import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { UserSignupComponent } from '../user-signup/user-signup.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  @Output() signUpClicked: EventEmitter<any> = new EventEmitter;
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
    this.signUpClicked.emit();
    // this.dialogService.open(UserSignupComponent)

  }

  onlogin(formValue: any) {
    console.log(formValue);
  }

}
