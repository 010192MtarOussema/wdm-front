import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { PrimeNGConfig, TreeNode } from 'primeng/api';
import { User } from 'src/app/models/user';
import { UserGroup } from 'src/app/models/userGroup';
import { GroupesTilisateursService } from 'src/app/services/groupes-tilisateurs.service';
import { formatDate } from '@angular/common';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { PreferenceService } from 'src/app/services/preference.service';
import { Preference } from 'src/app/models/Preference';
import { AbilityDtoService } from 'src/app/services/ability.service';
import { AbilityDto } from 'src/app/models/ability';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.sass']
})
export class NewUserComponent implements OnInit {
  sourceProducts: any[] = [];
  userGroupes: UserGroup[];
  targetProducts: any[] = [];
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
      title: 'Add new User',
      items: ['Administration'],
      active: 'new user'
    }
  ];
  selectedFiles2: AbilityDto;


  //preferences
  preferences!: Preference[];
  mode = new UntypedFormControl('side');
  taskForm: UntypedFormGroup;
  showFiller = false;
  isNewEvent = false;
  dialogTitle: string;
  userImg: string;
  direction: string;
  files3: AbilityDto[];

  constructor(private formBuilder: FormBuilder, private groupeUtilisateurService: GroupesTilisateursService, private nodeService: AbilityDtoService,
    private primengConfig: PrimeNGConfig, private fb: UntypedFormBuilder, public preferenceService: PreferenceService,
  ) {
    this.fileUploadForm = fb.group({
      singleUpload: ['']
    });

  }






  resetFormField() {
    this.taskForm.controls.name.reset();
    this.taskForm.controls.title.reset();
    this.taskForm.controls.done.reset();
    this.taskForm.controls.priority.reset();
    this.taskForm.controls.due_date.reset();
    this.taskForm.controls.note.reset();
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }

  ngOnInit(): void {
    this.nodeService.getAllAbilityDto().then(files => { this.files3 = files; console.log("test ", this.files3) });


    this.preferenceService.getAPreferences().subscribe(data => {
      console.log(data)
      this.preferences = data;
    })
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
      firstName: [''],
      lastName: [''],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      status: ['', [Validators.required]],
      realName: [''],
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
