import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationType } from 'src/app/models/enum/notification-type.enum';

import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.currentUserValue) {
      return true;
    }
    this.router.navigate(['/authentication/signin']);
    return false;
  }
  // private isUserLoggedIn(): boolean {
  //   if (this.authService.currentUser) {
  //     return true;
  //   }
  //   this.router.navigate(['/authentication/signin']);
  //   return false;

  // }
  //   if (this.authService.currentUserValue) {
  //     return true;
  //   }
  // }
}
