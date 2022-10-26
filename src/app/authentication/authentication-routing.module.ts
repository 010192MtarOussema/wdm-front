import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LockedComponent } from './locked/locked.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ChangePasswordComponent } from './change-password/change-password.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    component: SigninComponent
  },

  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'locked',
    component: LockedComponent
  },
  {
    path: 'page404',
    component: Page404Component
  },
  {
    path: 'page500',
    component: Page500Component
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes), MatSnackBarModule],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
