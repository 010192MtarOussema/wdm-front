import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangerMotDePasseUser } from 'src/app/models/change-password';
import { GestionsUtilisateursService } from 'src/app/services/gestions-utilisateurs.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.sass']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: UntypedFormGroup;
  submitted = false;
  change : ChangerMotDePasseUser ; 
  selection = new SelectionModel<ChangerMotDePasseUser>(true, []);
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router, 
    private gestionsUtilisateursService : GestionsUtilisateursService ,
    private snackBar: MatSnackBar
 
  ) {}
  ngOnInit() {
    this.change = new ChangerMotDePasseUser();
    this.changePasswordForm = this.formBuilder.group({
      id: [this.change.id] , 
      password: [
        this.change.password,
        [Validators.required,  Validators.minLength(5)]
      ],
      confirmMotDepasse: [
        this.change.confirmMotDepasse,
        [Validators.required,  Validators.minLength(5)]
      ]
    });
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
    console.log('change pass', this.changePasswordForm.getRawValue())
    // this.submitted = true;
    // // stop here if form is invalid
    // if (this.changePasswordForm.invalid) {
    //   return;
    // } else {
      const totalSelect = this.selection.selected.length;

    this.gestionsUtilisateursService.changePassword(this.changePasswordForm.getRawValue()).subscribe(data=>{
      this.showNotification(
        'snackbar-danger',
        totalSelect + ' Record Delete Successfully...!!!',
        'bottom',
        'center'
      );
     
    })
    //this.route
     this.router.navigate(['/authentication/signin']);
    // }
  }
}
