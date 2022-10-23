import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { PrimeNGConfig, TreeNode } from 'primeng/api';
import { User } from 'src/app/models/user';
import { UserGroup } from 'src/app/models/userGroup';
import { GroupesTilisateursService } from 'src/app/services/groupes-tilisateurs.service';
import { PreferenceService } from 'src/app/services/preference.service';
import { Preference } from 'src/app/models/Preference';
import { AbilityService } from 'src/app/services/ability.service';
import { AbilityDto } from 'src/app/models/ability';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Authorization } from 'src/app/models/authorization';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-add-new-groupe',
  templateUrl: './add-new-groupe.component.html',
  styleUrls: ['./add-new-groupe.component.sass']
})
export class AddNewGroupeComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
    'select',
    'name',
    'description',
    'authorization'
  ];
  userGroupes: UserGroup[];
  userGroupForm: FormGroup;
  isLinear = false;
  userGroupe: UserGroup;
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
      title: 'Ajouter un nouvel utilisateur',
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
  constructor(private formBuilder: FormBuilder, private groupeUtilisateurService: GroupesTilisateursService, private abilityService: AbilityService,
    private primengConfig: PrimeNGConfig, public httpClient: HttpClient, private fb: UntypedFormBuilder, private authorisationService: AuthorizationService,
    public preferenceService: PreferenceService, private snackBar: MatSnackBar
  ) {
    super();
  }



  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };
  ngOnInit(): void {
    this.loadData();
    this.preferenceService.getAPreferences().subscribe(data => {
      this.preferences = data;

      console.info("list des pref", this.preferences)

    })


    this.authorisationService.getAllAuthorization().subscribe(data => {
      this.authorizations = data;
    })


    this.userGroupe = new UserGroup();
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

    this.userGroupForm = this.formBuilder.group({
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
