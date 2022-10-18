import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GestionsUtilisateursService } from 'src/app/services/gestions-utilisateurs.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
    'select',
    'name',

    'description',


    'authorization'
  ];
  sourceProducts: any[] = [];
  userGroupes: UserGroup[];
  targetProducts: any[] = [];
  userForm: FormGroup;
  isLinear = false;
  user: User;
  show: boolean = false;
  fileUploadForm: UntypedFormGroup;
  status = new UntypedFormControl('', Validators.required);
  animals: any[] = [
    'En création',
    'Valide',
    'Bloqué'
  ];
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
  files3: AbilityDto[];

  exampleDatabase: GestionsUtilisateursService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<User>(true, []);
  constructor(private formBuilder: FormBuilder, private groupeUtilisateurService: GroupesTilisateursService, private nodeService: AbilityDtoService,
    private primengConfig: PrimeNGConfig, public httpClient: HttpClient, private fb: UntypedFormBuilder,
    public preferenceService: PreferenceService, private snackBar: MatSnackBar
  ) {
    super();
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
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };
  ngOnInit(): void {
    this.loadData();
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
  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      const index: number = this.dataSource.renderedData.findIndex(
        (d) => d === item
      );
      // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
      this.exampleDatabase.dataChange.value.splice(index, 1);
      this.selection = new SelectionModel<User>(true, []);
    });
    this.showNotification(
      'snackbar-danger',
      totalSelect + ' Record Delete Successfully...!!!',
      'bottom',
      'center'
    );
  }
  public loadData() {
    this.exampleDatabase = new GestionsUtilisateursService(this.httpClient);
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
export class ExampleDataSource extends DataSource<User> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: User[] = [];
  renderedData: User[] = [];
  constructor(
    public gestionUtilisateurService: GestionsUtilisateursService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<User[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.gestionUtilisateurService.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page
    ];
    this.gestionUtilisateurService.getAllUsers();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.gestionUtilisateurService.data
          .slice()
          .filter((user: User) => {
            const searchStr = (
              user.firstName +
              user.lastName +
              user.email +
              user.status +
              user.passeword +
              user.picture +
              user.lastModifyPassword +
              user.lastVisitDate +
              user.pseudo +
              user.realName +
              user.createdDate +
              user.abilities +
              user.userGroups

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
  sortData(data: User[]): User[] {
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
