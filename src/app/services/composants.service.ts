import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { User } from '../models/user';
import { UnsubscribeOnDestroyAdapter } from '../shared/UnsubscribeOnDestroyAdapter';

@Injectable({
  providedIn: 'root'
})
export class ComposantsService extends UnsubscribeOnDestroyAdapter {
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
  getAllUsers(): void {
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
  addUser(user: User): void {
    // this.dialogData = advanceTable;

      this.httpClient.post(this.API_URL+'add-user', user).subscribe(data => {
      this.dialogData = user;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }
  updateUser(user: User): void {
    // this.dialogData = advanceTable;

     this.httpClient.put(this.API_URL+"update-user/"+ user.idUser, user).subscribe(data => {
      this.dialogData = user;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );
  }
  blockUser(id: number): void {
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
