import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService, UserAuth } from 'src/app/core/service/auth.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  userAuth : UserAuth ; 
  loginForm: UntypedFormGroup;
  submitted = false;
  error = '';
  hide = true;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService ,
    private snackBar: MatSnackBar


  ) {
    super();
  }
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(' ',[Validators.required, Validators.email, Validators.minLength(5)]),
      passeword: new FormControl(' ',Validators.required)
      // email: [
      //   '',
      //   [Validators.required, Validators.email, Validators.minLength(5)]
      // ],
      // password: ['', Validators.required]
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 5000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName
    });
  }
  onSubmit() {
    this.submitted = true;
    this.error = '';
    if (this.loginForm.invalid) {
      this.error = 'Username and Password not valid !';
      return;
    } else {
      this.userAuth = this.loginForm.value ;
      console.log(this.loginForm.value)
     this.authService
        .login(this.userAuth)
        .subscribe(
          (res) => {
            if (res) { 
              console.log("resposne ")
              // const token = this.authService.currentUserValue.token;
              // if (token) {
                this.router.navigate(['/list-utilisateurs']);
                this.showNotification(
                  'snackbar-success',
              
                  'Vous êtes bien connecté sur WDM ...!!!',
                  'top',
                  'center'
                );
              // }
            } else {
              this.error = 'Invalid Email Or Password';
            }
          },
          (error) => {
            this.error = error;
            this.submitted = false;
          }
        );
    }
  }
}
