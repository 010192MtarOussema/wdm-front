import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ShowNotificationService } from 'src/app/services/show-notification.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { NotificationType } from 'src/app/models/enum/notification-type.enum';
import { HeaderType } from 'src/app/models/enum/header-type.enum';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {


  private subscriptions: Subscription[] = [];
  loginForm: FormGroup;
  submitted = false;
  error: '';
  hide = true;
  user: User;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
    super();
  }
  ngOnInit() {
    // if (this.authService.isLoggedIn()) {
    //   this.router.navigate(['/administration/list-utilisateurs']);
    // } else {
    //   this.router.navigate(['/authentication/signin']);
    // }
    this.user = new User();
    this.loginForm = this.formBuilder.group({
      email: [
        this.user.email,
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      password: [this.user.password, Validators.required]
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  onLogin() {

    this.submitted = true;
    if (this.loginForm.invalid) {

      return;
    } else {
      console.log(this.loginForm.getRawValue())
      this.subscriptions.push(
        this.authService.login(this.loginForm.getRawValue()).subscribe(
          (response: HttpResponse<User>) => {
            const token = response.headers.get(HeaderType.JWT_TOKEN);
            this.authService.saveToken(token);
            this.authService.addUserToLocalStorage(response.body)
            this.router.navigate(['/administration/list-utilisateurs']);
            this.submitted = false;
          },
          (errorResponse: HttpErrorResponse) => {
            console.log(errorResponse)
            this.error = errorResponse.error.message
            this.submitted = false;
          }
        )
      )
    }

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}



// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from 'src/app/core/service/auth.service';
// import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
// import { User } from 'src/app/models/user';
// import { ShowNotificationService } from 'src/app/services/show-notification.service';
// import { PrimeNGConfig } from 'primeng/api';
// @Component({
//   selector: 'app-signin',
//   templateUrl: './signin.component.html',
//   styleUrls: ['./signin.component.scss']
// })
// export class SigninComponent
//   extends UnsubscribeOnDestroyAdapter
//   implements OnInit {
//   sourceProducts: any[];

//   targetProducts: any[];
//   loginForm: FormGroup;
//   submitted = false;
//   error = '';
//   hide = true;
//   user: User;
//   constructor(
//     private formBuilder: FormBuilder,
//     private router: Router,
//     private authService: AuthService,
//     private showNotificationService: ShowNotificationService,
//     private primengConfig: PrimeNGConfig
//   ) {
//     super();
//   }
//   ngOnInit() {
//     this.user = new User();
//     this.loginForm = this.formBuilder.group({
//       email: [
//         this.user.email,
//         [Validators.required, Validators.email, Validators.minLength(5)]
//       ],
//       password: [this.user.password, Validators.required]
//     });
//   }
//   get f() {
//     return this.loginForm.controls;
//   }
//   onSubmit() {
//     console.log('login form ', this.loginForm.getRawValue())
//     this.submitted = true;
//     this.error = '';
//     if (this.loginForm.invalid) {
//       this.error = 'Username and Password not valid !';
//       return;
//     } else {
//       this.subs.sink = this.authService

//         .login(this.loginForm.getRawValue())
//         .subscribe(
//           (res) => {
//             console.log("error", res)
//             if (res) {
//               console.log("response", res)
//               // const token = this.authService.currentUserValue.token;
//               // if (token) {
//               this.router.navigate(['/administration/list-utilisateurs']);
//               this.showNotificationService.showNotification(
//                 'snackbar-danger',
//                 'Bienvenue dans WDM',
//                 'top',
//                 'right'
//               );
//             }

//           },
//           (error) => {
//             console.log(error)
//             this.error = error
//             this.submitted = false;
//           }
//         );
//     }
//   }
// }
