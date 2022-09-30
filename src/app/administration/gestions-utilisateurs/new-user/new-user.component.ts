import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { User } from 'src/app/models/user';
import { UserGroup } from 'src/app/models/userGroup';
import { GroupesTilisateursService } from 'src/app/services/groupes-tilisateurs.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.sass']
})
export class NewUserComponent implements OnInit {
  sourceProducts:  any[] = [];
  userGroupes : UserGroup[]; 
  targetProducts: any[]  = [];;
  userForm: FormGroup;
  user: User;
  fileUploadForm: UntypedFormGroup;
  status = new UntypedFormControl('', Validators.required);
  animals: any[] = [
    'En création' ,
     'Valide' ,
     'Bloqué'
 ];
  breadscrums = [
    {
      title: 'Add new User',
      items: ['Administration'],
      active: 'new user'
    }
  ];
  constructor(private formBuilder: FormBuilder,  private groupeUtilisateurService:  GroupesTilisateursService,private primengConfig: PrimeNGConfig ) { 
    this.user = new User();


  }

  ngOnInit(): void {
    this.groupeUtilisateurService.list().subscribe(data =>{
      this.sourceProducts = data ; 

    
    }) ;
    this.primengConfig.ripple = true;
    this.createContactForm();
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
  createContactForm(){
  
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      status: ['', [Validators.required]],
      realName: ['', [Validators.required]],
      loginName: ['', [Validators.required]],
      pseudo: ['', [Validators.required]],
      passeword: ['', [Validators.required]],
      // abilities: new FormControl([]),
      // userGroups: new FormControl([]),
      // userPreferenceValues: new FormControl([])
    });
  }
  disableInfoPersonnell(){
    return this.userForm.get('lastName').hasError('required')  ||this.userForm.get('firstName').hasError('required') 
    || this.userForm.get('status').hasError('required') || this.userForm.get('realName').hasError('required')
   }
   disableInfosCompte(){
     return this.userForm.get('loginName').hasError('required') || this.userForm.get('pseudo').hasError('required')
   }
}
