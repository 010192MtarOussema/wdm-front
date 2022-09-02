import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AdvanceTable, } from './advance-table.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '../shared/UnsubscribeOnDestroyAdapter';
import { User } from './user';
@Injectable()
export class AdvanceTableService extends UnsubscribeOnDestroyAdapter {
  // private readonly API_URL = 'assets/data/advanceTable.json';
  private readonly API_URL = 'http://localhost:8080/api/';

  isTblLoading = true;
  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<
    User[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): User[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllUser(): Observable<User>{
   return this.httpClient.get<User>(this.API_URL+'users')
  }
  getAllAdvanceTables(): void {
   this.httpClient
      .get<User[]>(this.API_URL+'users')
      .subscribe(
        (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        }
      );
  }
  addAdvanceTable(user: User): void {
    // this.dialogData = advanceTable;

      this.httpClient.post(this.API_URL+'add-user', user).subscribe(data => {
      this.dialogData = user;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }
  updateAdvanceTable(user: User): void {
    // this.dialogData = advanceTable;

     this.httpClient.put(this.API_URL+"update-user/"+ user.id, user).subscribe(data => {
      this.dialogData = user;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );
  }
  deleteAdvanceTable(id: number): void {
    console.log("service id" , id);

     this.httpClient.post(this.API_URL+'block-user', id).subscribe(data => {
      this.dialogData = data;
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }
}
