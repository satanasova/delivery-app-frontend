import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.scss']
})
export class UserSignupComponent implements OnInit {
  @Output() logInClicked: EventEmitter<any> = new EventEmitter;
  signupForm: FormGroup;
  email: AbstractControl;
  name: AbstractControl;
  password : AbstractControl;
  confirmedPassword: AbstractControl;

  constructor(private fb: FormBuilder, public userService: UserService) {
    this.signupForm = this.fb.group({
      'email': ['', Validators.compose([
        Validators.required,
        Validators.email,
      ])],
      'name': ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^([A-z]+\s){0,2}[A-z]+$/),
        Validators.minLength(6)
      ])],
      'password': ['', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])],
      'confirmed_password': ['', Validators.compose([
        Validators.required,
        matchOtherField('password')
      ])]
    })

    this.email = this.signupForm.controls['email'];
    this.name = this.signupForm.controls['name'];
    this.password = this.signupForm.controls['password'];
    this.confirmedPassword = this.signupForm.controls['confirmed_password'];

    this.confirmedPassword.valueChanges.subscribe((value: string) => {
      console.log(value, this.confirmedPassword.errors);
    })
  }

  ngOnInit(): void { }

  togglePasswordFieldVisibility(passwordField: HTMLInputElement) {
    passwordField.type = passwordField.type === 'text' ? 'password' : 'text'
  }

  onsignup(formValue: any) {
    console.log(formValue);
  }

  onLogin() {
    this.logInClicked.emit();
    // this.userService.userSignupModal?.close();
    // this.userService.openLoginModal();
  }

}


function matchOtherField(otherPropname: any): ValidatorFn {
  return (control: any): ValidationErrors | null => {
    const otherControl = control && control.parent &&  control.parent.controls[otherPropname];
    let otherControlValue: string = otherControl  && otherControl.value;
    if (control.value !== otherControlValue) {
      return ({valueMatch: true} as ValidationErrors)
    }

    return null;
  }
}