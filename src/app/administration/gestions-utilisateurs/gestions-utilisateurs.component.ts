import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { User } from '../../models/user';
import { BlockUserComponent } from './block-user/block-user.component';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-gestions-utilisateurs',
  templateUrl: './gestions-utilisateurs.component.html',
  styleUrls: ['./gestions-utilisateurs.component.sass']
})
export class GestionsUtilisateursComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  displayedColumns = [
    'identifiant',
    'img',
    'login',
    'firstName',
    'lastName',
    'realName',
    'status',
    'createdDate',
    'updateDate',
    'lastVisitDate',
    'actions'
  ];
  userForm: FormGroup;
  exampleDatabase: UserService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<User>(true, []);
  id: number;
  user: User | null;

  breadscrums = [
    {
      title: 'Critères des recherches ',
      items: ['Administration'],
      active: 'Liste des utilisateurs'
    }
  ];
  status = new UntypedFormControl('', Validators.required);
  animals: any[] = [
    'En création',
    'Valide',
    'Bloqué'
  ];

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public utilisateurService: UserService,
    private snackBar: MatSnackBar,
    private router: Router, private formBuilder: FormBuilder,
  ) {
    super();
    // this.utilisateurServices.getAllUser().subscribe(data =>
    //   console.log("list users <====> " + data))
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };
  ngOnInit() {
    this.loadData();
    this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    Validators.email,
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


    });
  }
  refresh() {
    this.loadData();
  }
  addNew() {
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    this.router.navigate(['/administration/add-new-user']);

  }
  detailCall(row) {
    this.id = row.id;
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    this.router.navigate(['/administration/user-detail', this.id]);
  }
  editCall(row) {
    this.id = row.id;
    console.log('row ', row)

    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    // const dialogRef = this.dialog.open(FormDialogUserComponent, {
    //   data: {
    //     advanceTable: row,
    //     action: 'edit'
    //   },
    //   direction: tempDirection
    // });
    this.router.navigate(['/administration/edit-user', this.id]);
    // this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
    //   if (result === 1) {
    //     // When using an edit things are little different, firstly we find record inside DataService by id
    //     const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
    //       (x) => x.id === this.id
    //     );
    //     // Then you update that record using data from dialogData (values you enetered)
    //     this.exampleDatabase.dataChange.value[foundIndex] =
    //       this.advanceTableService.getDialogData();
    //     // And lastly refresh table
    //     this.refreshTable();
    //     this.showNotification(
    //       'snackbar-success',
    //       'Compte utilisateur modifié avec succès...!!!',
    //       'top',
    //       'center'
    //     );
    //   }
    // });
  }
  deleteItem(row) {
    this.id = row.id;
    console.log("row", this.id)
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(BlockUserComponent, {
      data: row,
      direction: tempDirection
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          (x) => x.id === this.id
        );
        this.exampleDatabase.dataChange.value[foundIndex] =
          this.utilisateurService.getDialogData();
        // for delete we use splice in order to remove single object from DataService
        // this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
        this.showNotification(
          'snackbar-success',
          'Compte utilisateur désactivé   avec succès...!!!',
          'top',
          'center'
        );
      }
    });
  }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.renderedData.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.renderedData.forEach((row) =>
        this.selection.select(row)
      );
  }
  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      const index: number = this.dataSource.renderedData.findIndex(
        (d) => d === item
      );
      // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
      this.exampleDatabase.dataChange.value.splice(index, 1);
      this.refreshTable();
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
    this.exampleDatabase = new UserService(this.httpClient);
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

  // context menu
  onContextMenu(event: MouseEvent, item: User) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
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
    public gestionUtilisateurService: UserService,
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
              user.password +
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
