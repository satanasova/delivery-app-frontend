import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeadersInterceptor } from './headers-interceptor';
import { UserService } from '../user/user.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true, deps: [UserService]}]
})
export class AuthModule { }
