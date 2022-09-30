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
import { Preference } from 'src/app/models/Preference';
import { PreferenceService } from 'src/app/services/preference.service';

@Component({
  selector: 'app-form-dialog-user',
  templateUrl: './form-dialog-user.component.html',
  styleUrls: ['./form-dialog-user.component.sass']
})
export class FormDialogUserComponent  implements OnInit {

  action: string;
  dialogTitle: string;
  userForm: UntypedFormGroup;
  user: User;
  userGroupes! : UserGroup[] ; 
  abilities! : Ability [];
  preferences! : Preference[] ;
  toppings = new UntypedFormControl();
  show : boolean = true ;
  isLinear = false;
  fileUploadForm: UntypedFormGroup;

  @ViewChild('abilitie') shoesSelectionListAbilities: MatSelectionList;
  @ViewChild('groupes') shoesSelectionListUserGroupes: MatSelectionList;
  @ViewChild('preference') shoesSelectionListPreferences: MatSelectionList;


  selection = new SelectionModel(true);
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
    public preferenceService : PreferenceService , 
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
    this.userForm = this.createContactForm();
    
  }
  ngOnInit() {
//  this.groupeUtilisateurService.list().subscribe(data =>{
//   this.userGroupes = data 
//  }) ;

 this.abilityService.getAllAbility().subscribe(data =>{
  this.abilities = data ;

 })
this.preferenceService.getAPreferences().subscribe(data=>{
  console.log(data)
  this.preferences = data ;
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
  getSelected3() {
    return this.shoesSelectionListPreferences.selectedOptions.selected.map(s => s.value);
  }
  onSelectionChange3() {
    console.log(this.getSelected3());
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
      userGroups : new FormControl([]) ,
      userPreferenceValues : new FormControl([])
      
      
    });
  }
  disableInfoPersonnell(){
   return this.userForm.get('lastName').hasError('required')  ||this.userForm.get('firstName').hasError('required') 
   || this.userForm.get('status').hasError('required') || this.userForm.get('realName').hasError('required')
  }
  disableInfosCompte(){
    return this.userForm.get('loginName').hasError('required') || this.userForm.get('pseudo').hasError('required')
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    console.log(this.userForm.getRawValue())
    this.userService.addUser(
      this.userForm.getRawValue()
    );
  }

  public confirmUpdate(): void {
    this.userService.updateUser(
      
      this.userForm.getRawValue()
    );
  }
}
