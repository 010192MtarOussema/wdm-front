import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { UserGroup } from '../models/userGroup';

@Injectable({
  providedIn: 'root'
})
export class GroupesTilisateursService extends UnsubscribeOnDestroyAdapter {
  // private readonly API_URL = 'assets/data/advanceTable.json';
  private readonly API_URL = 'http://localhost:8080/users-groupes/';

  isTblLoading = true;
  dataChange: BehaviorSubject<UserGroup[]> = new BehaviorSubject<
    UserGroup[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): UserGroup[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */

  list(): Observable<UserGroup[]> {
    return this.httpClient.get<UserGroup[]>(this.API_URL + 'list')
  }
  getUserGrpoupes() {
    this.httpClient
      .get<UserGroup[]>(this.API_URL + 'list')
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
  addUserGroupe(userGroup: UserGroup): void {
    // this.dialogData = advanceTable;

    this.httpClient.post(this.API_URL + 'add-user-group', userGroup).subscribe(data => {
      this.dialogData = userGroup;
    },
      (err: HttpErrorResponse) => {
        // error code here
      });
  }
  updateUserGroupe(user: UserGroup): void {
    // this.dialogData = advanceTable;

    this.httpClient.put(this.API_URL + "update-user-group/" + user.id, user).subscribe(data => {
      this.dialogData = user;
    },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }
  deleteUserGroupe(id: number): void {
    console.log("service id", id);

    this.httpClient.delete(this.API_URL + 'delete-user-groupe/' + id).subscribe(data => {
      this.dialogData = data;
      console.log(id);
    },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }
}
