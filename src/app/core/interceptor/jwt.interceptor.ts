import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService, private route: Router) { }

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {


    if (httpRequest.url.includes(`${this.authenticationService.host}/user/login`)) {

      return next.handle(httpRequest)
    }
    // if (httpRequest.url.includes(`${this.authenticationService.host}/user/register`)) {
    //   return next.handle(httpRequest);
    // }

    this.authenticationService.loadToken();
    const token = this.authenticationService.getToken();
    const request = httpRequest.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(request)
    // .pipe(
    //   catchError((err) => {
    //     if (err.status == 0) {
    //       this.route.navigate(['authentication/page500'])
    //     }

    //     const error = err.error.message || err.statusText;
    //     return throwError(error);
    //   })
    // );;

  }
}
