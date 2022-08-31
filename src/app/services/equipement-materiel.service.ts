import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { EquipementMateriel } from '../models/equipement-materiel';

@Injectable({
  providedIn: 'root'
})
export class EquipementMaterielService extends UnsubscribeOnDestroyAdapter {
  // private readonly API_URL = 'assets/data/advanceTable.json';
  private readonly API_URL = 'http://localhost:8080/api/';

  isTblLoading = true;
  dataChange: BehaviorSubject<EquipementMateriel[]> = new BehaviorSubject<
  EquipementMateriel[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): EquipementMateriel[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllEquipementMateriel(): Observable<EquipementMateriel>{
   return this.httpClient.get<EquipementMateriel>(this.API_URL+'EquipementMateriels')
  }
  getAllEquipementMateriels(): void {
   this.httpClient
      .get<EquipementMateriel[]>(this.API_URL+'EquipementMateriels')
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
  addEquipementMateriel(equipementMateriel: EquipementMateriel): void {
    // this.dialogData = advanceTable;

      this.httpClient.post(this.API_URL+'add-EquipementMateriel', equipementMateriel).subscribe(data => {
      this.dialogData = EquipementMateriel;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }
  updateEquipementMateriel(equipementMateriel: EquipementMateriel): void {
    // this.dialogData = advanceTable;

     this.httpClient.put(this.API_URL+"update-EquipementMateriel/"+ equipementMateriel.id, EquipementMateriel).subscribe(data => {
      this.dialogData = EquipementMateriel;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );
  }
  deleteEquipementMateriel(id: number): void {
    console.log("service id" , id);

     this.httpClient.post(this.API_URL+'block-EquipementMateriel', id).subscribe(data => {
      this.dialogData = data;
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }
}
