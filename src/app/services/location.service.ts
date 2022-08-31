import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Location } from '../models/location';
@Injectable({
  providedIn: 'root'
})
export class LocationService extends UnsubscribeOnDestroyAdapter {
  // private readonly API_URL = 'assets/data/advanceTable.json';
  private readonly API_URL = 'http://localhost:8080/api/';

  isTblLoading = true;
  dataChange: BehaviorSubject<Location[]> = new BehaviorSubject<
  Location[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Location[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllLocation(): Observable<Location>{
   return this.httpClient.get<Location>(this.API_URL+'Locations')
  }
  getAllLocations(): void {
   this.httpClient
      .get<Location[]>(this.API_URL+'Locations')
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
  addLocation(Location: Location): void {
    // this.dialogData = advanceTable;

      this.httpClient.post(this.API_URL+'add-Location', Location).subscribe(data => {
      this.dialogData = Location;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }
  updateLocation(location: Location): void {
    // this.dialogData = advanceTable;

     this.httpClient.put(this.API_URL+"update-Location/"+ location.id, Location).subscribe(data => {
      this.dialogData = Location;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );
  }
  deleteLocation(id: number): void {
    console.log("service id" , id);

     this.httpClient.post(this.API_URL+'block-Location', id).subscribe(data => {
      this.dialogData = data;
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }
}
