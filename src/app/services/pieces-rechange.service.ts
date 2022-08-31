import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { PiecesRechange } from '../models/piecesRechange';

@Injectable({
  providedIn: 'root'
})
export class PiecesRechangeService extends UnsubscribeOnDestroyAdapter {
  // private readonly API_URL = 'assets/data/advanceTable.json';
  private readonly API_URL = 'http://localhost:8080/api/';

  isTblLoading = true;
  dataChange: BehaviorSubject<PiecesRechange[]> = new BehaviorSubject<
  PiecesRechange[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): PiecesRechange[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllPiecesRechange(): Observable<PiecesRechange>{
   return this.httpClient.get<PiecesRechange>(this.API_URL+'pieces-rechanges')
  }
  getAllPiecesRechanges(): void {
   this.httpClient
      .get<PiecesRechange[]>(this.API_URL+'pieces-rechanges')
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
  addPiecesRechange(PiecesRechange: PiecesRechange): void {
    // this.dialogData = advanceTable;

      this.httpClient.post(this.API_URL+'add-pieces-rechanges', PiecesRechange).subscribe(data => {
      this.dialogData = PiecesRechange;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }
  updatePiecesRechange(PiecesRechange: PiecesRechange): void {
    // this.dialogData = advanceTable;

     this.httpClient.put(this.API_URL+"update-pieces-rechanges/"+ PiecesRechange.id, PiecesRechange).subscribe(data => {
      this.dialogData = PiecesRechange;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );
  }
  deletePiecesRechange(id: number): void {
    console.log("service id" , id);

     this.httpClient.post(this.API_URL+'delete-PiecesRechange', id).subscribe(data => {
      this.dialogData = data;
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }
}
