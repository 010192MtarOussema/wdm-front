import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';
import { AbilityDto } from 'src/app/models/ability';
import { Authorization } from 'src/app/models/authorization';
import { Preference } from 'src/app/models/Preference';
import { User } from 'src/app/models/user';
import { UserGroup } from 'src/app/models/userGroup';
import { AbilityService } from 'src/app/services/ability.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { PreferenceService } from 'src/app/services/preference.service';
import { UserGroupeService } from 'src/app/services/user-groupe.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
    'select',
    'name',
    'description',
    'authorization'
  ];
  userGroupes: UserGroup[];
  targetProducts: any[] = [];
  userForm: FormGroup;
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

  authorizations!: Authorization[];
  breadscrums = [
    {
      title: "Modifier le profil de l'utilisateur",
      items: ['Administration'],
      active: 'Utilisateurs'
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
  abilities: AbilityDto[];

  exampleDatabase: AbilityService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<User>(true, []);
  constructor(private formBuilder: FormBuilder, private userGroupesService: UserGroupeService, private abilityService: AbilityService,
    public httpClient: HttpClient, private fb: UntypedFormBuilder, private authorisationService: AuthorizationService,
    public preferenceService: PreferenceService, private snackBar: MatSnackBar, private activatedRoute: ActivatedRoute
  ) {
    super();
  }



  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };
  ngOnInit(): void {
    let _idusergroupe = this.activatedRoute.snapshot.params.id;
    console.log(_idusergroupe)
    this.loadData();
    this.preferenceService.getAPreferences().subscribe(data => {
      this.preferences = data;
      // const json = this.preferences.forEach(posibleValue => {
      //   JSON.stringify(posibleValue.possibleValue);
      //   console.log(JSON.stringify(posibleValue.possibleValue))
      // })
      console.info("list des pref", this.preferences)

    })
    // this.abilityService.getAllAbilityDto().subscribe(response => {
    //   this.abilities = response;
    //   console.log("list des abilities", this.abilities);
    // })

    this.authorisationService.getAllAuthorization().subscribe(data => {
      this.authorizations = data;
    })

    this.userGroupesService.list().subscribe(data => {
      this.userGroupes = data;

      console.info("list des groupes", this.userGroupes)

    });
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
        'oussema.mtar@gmail.com',
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
  public loadData() {
    this.exampleDatabase = new AbilityService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    this.subs.sink = fromEvent(this.filter.nativeElement, 'keyup').subscribe(
      () => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      }
    );
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 5000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName
    });
  }
}
export class ExampleDataSource extends DataSource<AbilityDto> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: AbilityDto[] = [];
  renderedData: AbilityDto[] = [];
  constructor(
    public gestionUtilisateurService: AbilityService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<AbilityDto[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.gestionUtilisateurService.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page
    ];
    this.gestionUtilisateurService.getAllAbilities();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.gestionUtilisateurService.data
          .slice()
          .filter((user: AbilityDto) => {
            const searchStr = (
              user.name +
              user.description
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }
  disconnect() { }
  /** Returns a sorted copy of the database data. */
  sortData(data: AbilityDto[]): AbilityDto[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'id':
          [propertyA, propertyB] = [a.id, b.id];
          break;
          // case 'fName':
          //   [propertyA, propertyB] = [a.email, b.];
          //   break;
          // case 'lName':
          //   [propertyA, propertyB] = [a.lName, b.lName];
          //   break;
          // case 'email':
          //   [propertyA, propertyB] = [a.email, b.email];
          //   break;
          // case 'address':
          //   [propertyA, propertyB] = [a.address, b.address];
          //   break;
          // case 'mobile':
          //   [propertyA, propertyB] = [a.mobile, b.mobile];
          break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }
}
