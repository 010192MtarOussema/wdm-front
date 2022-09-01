import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder
} from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { formatDate } from '@angular/common';
import { UserGroup } from '../../../../models/userGroup';
import { GroupesTilisateursService } from '../../../../services/groupes-tilisateurs.service';
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  advanceTableForm: UntypedFormGroup;
  user: UserGroup;
  toppings = new UntypedFormControl();
  show : boolean = true ;
  toppingList: string[] = [
    'Admin',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato'
  ];
  status = new UntypedFormControl('', Validators.required);
  animals: any[] = [
     'En création' ,
      'Valide' ,
      'Bloqué'
  ];
  favoriteSeason: string;
  seasons: string[] = ['Lecture', 'Ecriture'];
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public advanceTableService: GroupesTilisateursService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle =
        data.advanceTable.name 
        this.show = !this.show; 
      this.user = data.advanceTable;
    } else {
      this.dialogTitle = 'Ajouter un nouveau Groupe';
      this.user = new UserGroup();
    }
    this.advanceTableForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      idUserGroup : [this.user.id],
      name: [this.user.name, [Validators.required]],
      description: [this.user.description, [Validators.required]],

       status: [this.user.status , [Validators.required]],

      
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    console.log("-------form" , this.advanceTableForm.getRawValue()) ;
    this.advanceTableService.addUserGroupe(
      this.advanceTableForm.getRawValue()
    );
  }

  public confirmUpdate(): void {
    console.log("-------form" , this.advanceTableForm.getRawValue()) ;
    this.advanceTableService.updateUserGroupe(
      
      this.advanceTableForm.getRawValue()
    );
  }
}
