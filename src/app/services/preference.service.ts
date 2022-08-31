import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Preference } from '../models/Preference';
import { UnsubscribeOnDestroyAdapter } from '../shared/UnsubscribeOnDestroyAdapter';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService extends UnsubscribeOnDestroyAdapter {
  // private readonly API_URL = 'assets/data/advanceTable.json';
  private readonly API_URL = 'http://localhost:8080/api/';

  isTblLoading = true;
  dataChange: BehaviorSubject<Preference[]> = new BehaviorSubject<
  Preference[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Preference[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAPreference(): Observable<Preference>{
   return this.httpClient.get<Preference>(this.API_URL+'preferences')
  }
  getAllPreferences(): void {
   this.httpClient
      .get<Preference[]>(this.API_URL+'preferences')
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
  addPreference(preference: Preference): void {
    // this.dialogData = advanceTable;

      this.httpClient.post(this.API_URL+'add-preference', preference).subscribe(data => {
      this.dialogData = preference;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }
  updatePreference(preference: Preference): void {
    // this.dialogData = advanceTable;

     this.httpClient.put(this.API_URL+"update-preference/"+ preference.id, preference).subscribe(data => {
      this.dialogData = preference;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );
  }
  deletePreference(id: number): void {
    console.log("service id" , id);

     this.httpClient.post(this.API_URL+'delete-preference', id).subscribe(data => {
      this.dialogData = data;
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }
}