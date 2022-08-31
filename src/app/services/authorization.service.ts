import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Authorization } from '../models/authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService extends UnsubscribeOnDestroyAdapter {
  // private readonly API_URL = 'assets/data/advanceTable.json';
  private readonly API_URL = 'http://localhost:8080/api/';

  isTblLoading = true;
  dataChange: BehaviorSubject<Authorization[]> = new BehaviorSubject<
  Authorization[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Authorization[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllAuthorization(): Observable<Authorization>{
   return this.httpClient.get<Authorization>(this.API_URL+'roles')
  }
  getAllAbilities(): void {
   this.httpClient
      .get<Authorization[]>(this.API_URL+'roles')
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
  addAuthorization(authorization: Authorization): void {
    // this.dialogData = advanceTable;

      this.httpClient.post(this.API_URL+'add-Authorization', authorization).subscribe(data => {
      this.dialogData = Authorization;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }
  updateAuthorization(authorization: Authorization): void {
    // this.dialogData = advanceTable;

     this.httpClient.put(this.API_URL+"update-Authorization/"+ authorization.id, authorization).subscribe(data => {
      this.dialogData = authorization;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );
  }
  deleteAuthorization(id: number): void {
    console.log("service id" , id);

     this.httpClient.post(this.API_URL+'delete-Authorization', id).subscribe(data => {
      this.dialogData = data;
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }
}
