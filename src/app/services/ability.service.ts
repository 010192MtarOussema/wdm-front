import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Ability } from '../models/ability';

@Injectable({
  providedIn: 'root'
})
export class AbilityService extends UnsubscribeOnDestroyAdapter {
  // private readonly API_URL = 'assets/data/advanceTable.json';
  private readonly API_URL = 'http://localhost:8080/api/';

  isTblLoading = true;
  dataChange: BehaviorSubject<Ability[]> = new BehaviorSubject<
  Ability[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Ability[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllAbility(): Observable<Ability>{
   return this.httpClient.get<Ability>(this.API_URL+'roles')
  }
  getAllAbilities(): void {
   this.httpClient
      .get<Ability[]>(this.API_URL+'roles')
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
  addAbility(ability: Ability): void {
    // this.dialogData = advanceTable;

      this.httpClient.post(this.API_URL+'add-ability', ability).subscribe(data => {
      this.dialogData = ability;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }
  updateAbility(role: Ability): void {
    // this.dialogData = advanceTable;

     this.httpClient.put(this.API_URL+"update-ability/"+ role.id, role).subscribe(data => {
      this.dialogData = role;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );
  }
  deleteAbility(id: number): void {
    console.log("service id" , id);

     this.httpClient.post(this.API_URL+'delete-ability', id).subscribe(data => {
      this.dialogData = data;
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }
}
