import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
  FormControl
} from '@angular/forms';
import { User } from '../../../../models/user';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { GestionsUtilisateursService } from 'src/app/services/gestions-utilisateurs.service';
import { GroupesTilisateursService } from 'src/app/services/groupes-tilisateurs.service';
import { UserGroup } from 'src/app/models/userGroup';
import { AbilityService } from 'src/app/services/ability.service';
import { Ability } from 'src/app/models/ability';

@Component({
  selector: 'app-form-dialog-user',
  templateUrl: './form-dialog-user.component.html',
  styleUrls: ['./form-dialog-user.component.sass']
})
export class FormDialogUserComponent  implements OnInit {

  action: string;
  dialogTitle: string;
  advanceTableForm: UntypedFormGroup;
  user: User;
  userGroupes! : UserGroup[] ; 
  abilities! : Ability [];
  toppings = new UntypedFormControl();
  show : boolean = true ;

  fileUploadForm: UntypedFormGroup;

  @ViewChild('abilitie') shoesSelectionListAbilities: MatSelectionList;
  @ViewChild('groupes') shoesSelectionListUserGroupes: MatSelectionList;

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
    public userService: GestionsUtilisateursService,
    public groupeUtilisateurService:  GroupesTilisateursService ,
    public abilityService : AbilityService ,
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
      this.user = new User();
    }
    this.advanceTableForm = this.createContactForm();
    
  }
  ngOnInit() {
 this.groupeUtilisateurService.list().subscribe(data =>{
  this.userGroupes = data 
 }) ;

 this.abilityService.getAllAbility().subscribe(data =>{
  this.abilities = data ;

 })

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
  getSelected() {
    return this.shoesSelectionListAbilities.selectedOptions.selected.map(s => s.value);
  }
  getSelected2() {
    return this.shoesSelectionListUserGroupes.selectedOptions.selected.map(s => s.value);
  }
  onSelectionChange2() {
    console.log(this.getSelected2());
  }
  onSelectionChange() {
    console.log(this.getSelected());
  }

  createContactForm(): UntypedFormGroup {
  
    return this.fb.group({
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
      abilities : new FormControl([]) , 
      userGroups : new FormControl([])
      
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    console.log(this.advanceTableForm.getRawValue())
    this.userService.addUser(
      this.advanceTableForm.getRawValue()
    );
  }

  public confirmUpdate(): void {
    this.userService.updateUser(
      
      this.advanceTableForm.getRawValue()
    );
  }
}
