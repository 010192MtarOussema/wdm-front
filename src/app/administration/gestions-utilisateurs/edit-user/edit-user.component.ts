import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { User } from 'src/app/core/models/user';
import { UserGroup } from 'src/app/models/userGroup';
import { GroupesTilisateursService } from 'src/app/services/groupes-tilisateurs.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.sass']
})
export class EditUserComponent implements OnInit {
  sourceProducts: any[] = [];
  userGroupes: UserGroup[];
  targetProducts: any[] = [];;
  userForm: FormGroup;
  user: User;
  fileUploadForm: UntypedFormGroup;
  status = new UntypedFormControl('', Validators.required);
  animals: any[] = [
    'En création',
    'Valide',
    'Bloqué'
  ];
  breadscrums = [
    {
      title: 'Edit User',
      items: ['Administration'],
      active: 'new user'
    }
  ];
  constructor(private formBuilder: FormBuilder, private groupeUtilisateurService: GroupesTilisateursService,
    private primengConfig: PrimeNGConfig, private fb: UntypedFormBuilder
  ) {

    this.fileUploadForm = fb.group({
      singleUpload: ['']
    });

  }

  ngOnInit(): void {
    this.groupeUtilisateurService.list().subscribe(data => {
      this.sourceProducts = data;


    });
    this.primengConfig.ripple = true;
    this.user = new User();
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
  createContactForm() {

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
  disableInfoPersonnell() {
    return this.userForm.get('lastName').hasError('required') || this.userForm.get('firstName').hasError('required')
      || this.userForm.get('status').hasError('required') || this.userForm.get('realName').hasError('required')
  }
  disableInfosCompte() {
    return this.userForm.get('loginName').hasError('required') || this.userForm.get('pseudo').hasError('required')
  }
}
