import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { User } from 'src/app/models/user';
import { ShowNotificationService } from 'src/app/services/show-notification.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  loginForm: FormGroup;
  submitted = false;
  error = '';
  hide = true;
  user : User ; 
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService , 
    private showNotificationService : ShowNotificationService 
  ) {
    super();
  }
  ngOnInit() {
    this.user = new User() ;
    this.loginForm = this.formBuilder.group({
      email: [
        this.user.email,
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      password: [this.user.passeword, Validators.required]
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    console.log('login form ', this.loginForm.getRawValue())
    this.submitted = true;
    this.error = '';
    if (this.loginForm.invalid) {
      this.error = 'Username and Password not valid !';
      return;
    } else {
      this.subs.sink = this.authService
      
        .login(this.loginForm.getRawValue())
        .subscribe(
          (res) => {
            console.log("error")
            if (res) {
              console.log("response" , res)
              // const token = this.authService.currentUserValue.token;
              // if (token) {
                this.router.navigate(['/administration/list-utilisateurs']);
                // this.showNotificationService.showNotification(
                //   'snackbar-danger',
                //   'Welcome To WDM',
                //   'top',
                //   'right'
                // );
              // }
            } 
          },
          (error) => {
            console.log(error)
            this.error = "Probleme ";
            this.submitted = false;
          }
        );
    }
  }
}
