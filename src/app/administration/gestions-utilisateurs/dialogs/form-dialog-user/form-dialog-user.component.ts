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
import { User } from '../../../../models/user';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSelectionListChange } from '@angular/material/list';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { GestionsUtilisateursService } from 'src/app/services/gestions-utilisateurs.service';

@Component({
  selector: 'app-form-dialog-user',
  templateUrl: './form-dialog-user.component.html',
  styleUrls: ['./form-dialog-user.component.sass']
})
export class FormDialogUserComponent  {

  action: string;
  dialogTitle: string;
  advanceTableForm: UntypedFormGroup;
  user: User;
  toppings = new UntypedFormControl();
  show : boolean = true ;
  abilitiesList: string[] = [
    'Action sur script',
    'Commentaire script',
 
   
  ];
  fileUploadForm: UntypedFormGroup;

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  Contacts: string[] = [
    'contact 1',
    'contact 2',
    'contact 3',
    'contact 4',
    'contact 5',
    'contact 6',
    'contact 7',
    'contact 8',
    'contact 9',
    'contact 10',
    'contact 9',
    'contact 10',
    'contact 9',
    'contact 10',
    'contact 9',
    'contact 10',
    'contact 9',
    'contact 10',
    'contact 9',
    'contact 10',
    'contact 9',
    'contact 10',
    'contact 9',
    'contact 10',
    'contact 9',
    'contact 10',
    'contact 9',
    'contact 10',
  ];
  groupesList: string[] = [
    'Admin',
    'Super-Admin',
    'Manager',
    'Consultant',
    'Manager',
   
  ];
  selection = new SelectionModel(true);
  list = Array.from(Array(10000).keys());
  status = new UntypedFormControl('', Validators.required);
  animals: any[] = [
     'En création' ,
      'Valide' ,
      'Bloqué'
  ];
  favoriteSeason: string;
  seasons: string[] = ['Lecture', 'Ecriture'];
  constructor(
    public dialogRef: MatDialogRef<FormDialogUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public advanceTableService: GestionsUtilisateursService,
    private fb: UntypedFormBuilder
  ) {
    this.fileUploadForm = fb.group({
      singleUpload: ['']
    });
    // Set the defaults

    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle =
        data.advanceTable.firstName + ' ' + data.advanceTable.lastName;
        this.show = !this.show; 
      this.user = data.advanceTable;
    } else {
      this.dialogTitle = 'Ajouter un nouveau utilisateur';
      this.user = new User({});
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
  onSelectionChange(selection: MatSelectionListChange) {
    selection.source
      ? this.selection.select(selection.source._value)
      : this.selection.deselect(selection.source._value);
  }

  onSelectAll(e: MatCheckboxChange) {
    e.checked ? this.selection.select(...this.list) : this.selection.clear();
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      idUser : [this.user.idUser],
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      email: [
        this.user.email,
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      status: [this.user.status , [Validators.required]],
      realName: [this.user.realName, [Validators.required]],
      loginName: [this.user.loginName, [Validators.required]],
      pseudo: [this.user.pseudo, [Validators.required]],
      passeword: [this.user.passeword, [Validators.required]],
      
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.advanceTableService.addUser(
      this.advanceTableForm.getRawValue()
    );
  }

  public confirmUpdate(): void {
    this.advanceTableService.updateUser(
      
      this.advanceTableForm.getRawValue()
    );
  }
}
