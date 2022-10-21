import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangerMotDePasseUser } from 'src/app/models/change-password';
import { UserService } from 'src/app/services/user.service';
import { CustomValidators } from '../validator/CustomValidators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.sass']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  submitted = false;
  change: ChangerMotDePasseUser;
  selection = new SelectionModel<ChangerMotDePasseUser>(true, []);

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar

  ) {

  }
  ngOnInit() {
    this.change = new ChangerMotDePasseUser();
    this.changePasswordForm = new FormGroup(
      {
        id: new FormControl(this.change.id, []),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8)
        ]),
        confirmPassword: new FormControl('', [Validators.required])
      },

      CustomValidators.mustMatch('password', 'confirmPassword') // insert here
    );

    // this.changePasswordForm = this.formBuilder.group({
    //   id: [this.change.id] , 
    //   password : new FormControl (
    //     this.change.password,
    //     [Validators.required,  Validators.minLength(5)]
    //   ),
    //   confirmMotDepasse:  new FormControl (
    //     this.change.confirmMotDepasse,
    //     [Validators.required]
    //   )
    // },

    // CustomValidators.mustMatch('password', 'confirmMotDepasse') 
    // );

  }
  get f() {
    return this.changePasswordForm.controls;
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
    console.log('change pass', this.changePasswordForm.value)
    this.submitted = true;
    // // stop here if form is invalid
    if (this.changePasswordForm.invalid) {
      return;
    } else {

      this.userService.changePassword(this.changePasswordForm.getRawValue()).subscribe(data => {
        this.showNotification(
          'snackbar-success',
          ' Password Change Successfully...!!!',
          'bottom',
          'center'
        );

      })

      this.router.navigate(['/authentication/signin']);
    }
  }

}
