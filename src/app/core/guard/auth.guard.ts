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
import { NotificationService } from 'src/app/services/notification.service';

import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private notificationService: NotificationService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isUserLoggedIn();
  }

  private isUserLoggedIn(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/authentication/signin']);
    this.notificationService.notify(NotificationType.ERROR, `You need to log in to access this page `.toUpperCase())
    return false;

  }
  //   if (this.authService.currentUserValue) {
  //     return true;
  //   }
  // }
}
