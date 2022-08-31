import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { FunctionalDomain } from '../models/functionalDomain';

@Injectable({
  providedIn: 'root'
})
export class FunctionalDomainService extends UnsubscribeOnDestroyAdapter {
  // private readonly API_URL = 'assets/data/advanceTable.json';
  private readonly API_URL = 'http://localhost:8080/api/';

  isTblLoading = true;
  dataChange: BehaviorSubject<FunctionalDomain[]> = new BehaviorSubject<
  FunctionalDomain[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): FunctionalDomain[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllFunctionalDomain(): Observable<FunctionalDomain>{
   return this.httpClient.get<FunctionalDomain>(this.API_URL+'roles')
  }
  getAllAbilities(): void {
   this.httpClient
      .get<FunctionalDomain[]>(this.API_URL+'roles')
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
  addFunctionalDomain(functionalDomain: FunctionalDomain): void {
    // this.dialogData = advanceTable;

      this.httpClient.post(this.API_URL+'add-functionalDomain', functionalDomain).subscribe(data => {
      this.dialogData = FunctionalDomain;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }
  updateFunctionalDomain(functionalDomain: FunctionalDomain): void {
    // this.dialogData = advanceTable;

     this.httpClient.put(this.API_URL+"update-functionalDomain/"+ functionalDomain.id, functionalDomain).subscribe(data => {
      this.dialogData = FunctionalDomain;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );
  }
  deleteFunctionalDomain(id: number): void {
    console.log("service id" , id);

     this.httpClient.post(this.API_URL+'delete-functionalDomain', id).subscribe(data => {
      this.dialogData = data;
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }
}
