import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Role } from '../models/role';
@Injectable({
  providedIn: 'root'
})
export class RoleService extends UnsubscribeOnDestroyAdapter {
  // private readonly API_URL = 'assets/data/advanceTable.json';
  private readonly API_URL = 'http://localhost:8080/api/';

  isTblLoading = true;
  dataChange: BehaviorSubject<Role[]> = new BehaviorSubject<
  Role[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Role[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllRole(): Observable<Role>{
   return this.httpClient.get<Role>(this.API_URL+'roles')
  }
  getAllRoles(): void {
   this.httpClient
      .get<Role[]>(this.API_URL+'roles')
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
  addRole(role: Role): void {
    // this.dialogData = advanceTable;

      this.httpClient.post(this.API_URL+'add-role', role).subscribe(data => {
      this.dialogData = role;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }
  updateRole(role: Role): void {
    // this.dialogData = advanceTable;

     this.httpClient.put(this.API_URL+"update-role/"+ role.id, role).subscribe(data => {
      this.dialogData = role;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );
  }
  deleteRole(id: number): void {
    console.log("service id" , id);

     this.httpClient.post(this.API_URL+'block-role', id).subscribe(data => {
      this.dialogData = data;
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }
}
