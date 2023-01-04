import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserGroup } from 'src/app/models/userGroup';
import { PreferenceService } from 'src/app/services/preference.service';
import { Preference } from 'src/app/models/Preference';
import { AbilityService } from 'src/app/services/ability.service';
import { AbilityDto } from 'src/app/models/ability';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Authorization } from 'src/app/models/authorization';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { UserService } from 'src/app/services/user.service';
import { MatStepper } from '@angular/material/stepper';
import { ThemePalette } from '@angular/material/core';
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  userGroupes: UserGroup[];
  targetProducts: any[] = [];
  userForm: FormGroup;
  emailForm: FormGroup;
  isLinear = false;
  user: User;
  show: boolean = false;
  fileUploadForm: UntypedFormGroup;
  status = new UntypedFormControl('', Validators.required);
  statusUser: any[] = [
    'En création',
    'Valide',
    'Bloqué'
  ];
  toppings = new UntypedFormControl();
  color: ThemePalette = 'accent';
  authorizations!: Authorization[];
  breadscrums = [
    {
      title: 'Ajouter un nouvel utilisateur',
      items: ['Administration'],
      active: 'Utilisateurs'
    }
  ];
  selectedFiles2: AbilityDto;
  isEditable = false;
  isOptional = false;
  checkedPref: false;
  isNotFound: boolean;
  disableSelect = new FormControl(false);
  checked = new FormControl(true);

  disabled = new FormControl(true);
  //preferences
  preferences!: Preference[];
  mode = new UntypedFormControl('side');
  taskForm: UntypedFormGroup;
  showFiller = false;
  isNewEvent = false;
  dialogTitle: string;
  userImg: string;
  direction: string;
  abilities: AbilityDto[];
  error: '';
  exampleDatabase: AbilityService | null;
  selection = new SelectionModel<User>(true, []);

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: 'Primary', completed: false, color: 'primary' },
      { name: 'Accent', completed: false, color: 'accent' },
      { name: 'Warn', completed: false, color: 'warn' },
    ],
  };

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }
  constructor(private formBuilder: FormBuilder, private userService: UserService, private abilityService: AbilityService,
    public httpClient: HttpClient, private fb: UntypedFormBuilder, private authorisationService: AuthorizationService,
    public preferenceService: PreferenceService, private snackBar: MatSnackBar
  ) {
    super();

  }



  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  @ViewChild("stepper", { static: false }) stepper: MatStepper;

  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };
  ngOnInit(): void {
    this.isLinear = true

    this.preferenceService.getAPreferences().subscribe(data => {
      this.preferences = data;
      const json = this.preferences.forEach(posibleValue => {

        console.log(JSON.stringify(posibleValue.possiblevalue))
      })

      // console.info("list des pref", data.possibleValue)

    })
    // this.abilityService.getAllAbilityDto().subscribe(response => {
    //   this.abilities = response;
    //   console.log("list des abilities", this.abilities);
    // })

    this.authorisationService.getAllAuthorization().subscribe(data => {
      this.authorizations = data;
    })

    this.abilityService.getAllAbilityDto().subscribe(data => {

      this.abilities = data;
      console.log("data abilities ", this.abilities)
    })


    this.user = new User();
    this.createContactForm();
    this.createEmailForm()
  }


  shows() {
    console.log('test', !this.disabled, this.checked)
    return !this.disabled
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
  createEmailForm() {
    this.emailForm = this.formBuilder.group({
      email: [
        this.user.email,
        [Validators.required, Validators.email]
      ],

    })
  }
  createContactForm() {

    this.userForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [
        this.user.email,
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      status: ['', [Validators.required]],
      realName: [''],
      loginName: ['', [Validators.required]],
      pseudo: ['', [Validators.required]],
      passeword: ['', [Validators.required]],
      checked: ['']
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
    return this.emailForm && this.isLinear
  }

  ValidateEmail() {
    console.log(this.emailForm.value.email)
    this.userService.validateExistEmail(this.emailForm.value.email).subscribe(data => {
      console.log(data)
      this.isLinear = true
      this.stepper.next()
    }
      , (errorResponse: HttpErrorResponse) => {
        this.error = errorResponse.error.message


        console.log(errorResponse.error.message)
      })
  }
  // removeSelectedRows() {
  //   const totalSelect = this.selection.selected.length;
  //   this.selection.selected.forEach((item) => {
  //     const index: number = this.dataSource.renderedData.findIndex(
  //       (d) => d === item
  //     );
  //     // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
  //     this.exampleDatabase.dataChange.value.splice(index, 1);
  //     this.selection = new SelectionModel<User>(true, []);
  //   });
  //   this.showNotification(
  //     'snackbar-danger',
  //     totalSelect + ' Record Delete Successfully...!!!',
  //     'bottom',
  //     'center'
  //   );
  // }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 5000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName
    });
  }
}

