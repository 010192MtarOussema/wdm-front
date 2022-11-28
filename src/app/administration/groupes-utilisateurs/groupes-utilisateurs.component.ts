import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { DeleteDialogComponent } from './delete/delete.component';
import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { UserGroup } from '../../models/userGroup';
import { GroupesTilisateursService } from '../../services/groupes-tilisateurs.service';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';
import { AdvanceTable } from 'src/app/advance-table/advance-table.model';
import { DataSource } from '@angular/cdk/collections';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groupes-utilisateurs',
  templateUrl: './groupes-utilisateurs.component.html',
  styleUrls: ['./groupes-utilisateurs.component.sass']
})
export class GroupesUtilisateursComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  displayedColumns = [

    'identifiant',
    'name',
    'description',
    'status',
    'actions'
  ];

  exampleDatabase: GroupesTilisateursService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<UserGroup>(true, []);
  id: number;
  user: UserGroup | null;

  breadscrums = [
    {
      title: 'Listes des Groupes',
      items: ['Administration'],
      active: 'compte utilisateur'
    }
  ];

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public advanceTableService: GroupesTilisateursService,
    private router: Router,

    private snackBar: MatSnackBar
  ) {
    super();

  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };
  ngOnInit() {
    this.loadData();

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
    this.router.navigate(['/administration/add-groupe']);
    // const dialogRef = this.dialog.open(FormDialogComponent, {
    //   data: {
    //     advanceTable: this.user,
    //     action: 'add'
    //   },
    //   direction: tempDirection
    // });
    // this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
    //   if (result === 1) {
    //     // After dialog is closed we're doing frontend updates
    //     // For add we're just pushing a new row inside DataService
    //     this.exampleDatabase.dataChange.value.unshift(
    //       this.advanceTableService.getDialogData()
    //     );
    //     this.refreshTable();
    //     this.showNotification(
    //       'snackbar-success',
    //       'Nouveau Groupe ajouté avec succès ...!!!',
    //       'top',
    //       'center'
    //     );
    //   }
    // });
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
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        advanceTable: row,
        action: 'edit'
      },
      direction: tempDirection
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          (x) => x.id === this.id
        );
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] =
          this.advanceTableService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
        this.showNotification(
          'snackbar-success',
          'Groupe  modifié avec succès...!!!',
          'top',
          'center'
        );
      }
    });
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
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: row,
      direction: tempDirection
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          (x) => x.id === this.id
        );
        this.exampleDatabase.dataChange.value[foundIndex] =
          this.advanceTableService.getDialogData();
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
      this.selection = new SelectionModel<UserGroup>(true, []);
    });
    this.showNotification(
      'snackbar-danger',
      totalSelect + ' Record Delete Successfully...!!!',
      'bottom',
      'center'
    );
  }
  public loadData() {
    this.exampleDatabase = new GroupesTilisateursService(this.httpClient);
    console.log(this.exampleDatabase)
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
  onContextMenu(event: MouseEvent, item: AdvanceTable) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }
}
export class ExampleDataSource extends DataSource<UserGroup> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: UserGroup[] = [];
  renderedData: UserGroup[] = [];
  constructor(
    public exampleDatabase: GroupesTilisateursService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<UserGroup[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page
    ];
    this.exampleDatabase.getUserGrpoupes();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((userGroupe: UserGroup) => {
            const searchStr = (
              userGroupe.name +
              userGroupe.description +
              userGroupe.status
              // userGroupe.users  

            ).toLowerCase();
            return searchStr.toString().toLowerCase().indexOf(this.filter.toLowerCase()) !== -1;
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
  sortData(data: UserGroup[]): UserGroup[] {
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
