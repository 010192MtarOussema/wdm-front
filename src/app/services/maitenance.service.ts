import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Maintenance } from '../models/maintenance';

@Injectable({
  providedIn: 'root'
})
export class MaitenanceService extends UnsubscribeOnDestroyAdapter {
  // private readonly API_URL = 'assets/data/advanceTable.json';
  private readonly API_URL = 'http://localhost:8080/api/';

  isTblLoading = true;
  dataChange: BehaviorSubject<Maintenance[]> = new BehaviorSubject<
  Maintenance[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Maintenance[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllMaintenance(): Observable<Maintenance>{
   return this.httpClient.get<Maintenance>(this.API_URL+'Maintenances')
  }
  getAllMaintenances(): void {
   this.httpClient
      .get<Maintenance[]>(this.API_URL+'Maintenances')
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
  addMaintenance(Maintenance: Maintenance): void {
    // this.dialogData = advanceTable;

      this.httpClient.post(this.API_URL+'add-Maintenance', Maintenance).subscribe(data => {
      this.dialogData = Maintenance;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }
  updateMaintenance(Maintenance: Maintenance): void {
    // this.dialogData = advanceTable;

     this.httpClient.put(this.API_URL+"update-Maintenance/"+ Maintenance.id, Maintenance).subscribe(data => {
      this.dialogData = Maintenance;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );
  }
  deleteMaintenance(id: number): void {
    console.log("service id" , id);

     this.httpClient.post(this.API_URL+'block-Maintenance', id).subscribe(data => {
      this.dialogData = data;
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }
}
