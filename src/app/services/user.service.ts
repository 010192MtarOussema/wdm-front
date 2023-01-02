import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { User } from '../models/user';
import { ChangerMotDePasseUser } from '../models/change-password';
import { UserConnect } from '../models/user-connect';

@Injectable({
  providedIn: 'root'
})
export class UserService extends UnsubscribeOnDestroyAdapter {
  // private readonly API_URL = 'assets/data/advanceTable.json';
  private readonly API_URL = 'http://localhost:8080/user/';

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
  getAllUser(): Observable<User> {
    return this.httpClient.get<User>(this.API_URL + 'list')
  }
  getAllUsers(): void {
    this.httpClient
      .get<User[]>(this.API_URL + 'list')
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

    this.httpClient.post(this.API_URL + 'add-user', user).subscribe(data => {
      this.dialogData = user;
    },
      (err: HttpErrorResponse) => {
        // error code here
      });
  }
  updateUser(user: User): void {
    // this.dialogData = advanceTable;

    this.httpClient.put(this.API_URL + "update-user/" + user.id, user).subscribe(data => {
      this.dialogData = user;
    },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }

  getUserById(id: number) {
    return this.httpClient.get<User>(this.API_URL + "get-by/" + id)
  }

  getUserByGroup(id: number) {
    return this.httpClient.get(this.API_URL + "/user/by-group/" + id)
  }
  validateExistEmail(email: string): Observable<any> {
    let params = new HttpParams().set("email", email);
    // console.log(formData)
    return this.httpClient.post(`${this.API_URL}valid-email`, params)
  }

  changePassword(changePassword: ChangerMotDePasseUser): Observable<ChangerMotDePasseUser> {
    return this.httpClient.post<ChangerMotDePasseUser>(this.API_URL + 'update/password', changePassword)
  }


}