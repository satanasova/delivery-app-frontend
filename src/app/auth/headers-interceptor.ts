import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserService } from "../user/user.service";

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.userService.authToken) {
      return next.handle(req.clone({setHeaders: { auth: this.userService.authToken }}));
    } else {
      return next.handle(req);
    }
  }
}