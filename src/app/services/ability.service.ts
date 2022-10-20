import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { AbilityDto } from '../models/ability';

@Injectable({
  providedIn: 'root'
})
export class AbilityService extends UnsubscribeOnDestroyAdapter {
  // private readonly API_URL = 'assets/data/advanceTable.json';
  private readonly API_URL = 'http://localhost:8080/abilities/';

  isTblLoading = true;
  dataChange: BehaviorSubject<AbilityDto[]> = new BehaviorSubject<
    AbilityDto[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): AbilityDto[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllAbilityDto() {

    return this.httpClient.get<AbilityDto[]>(this.API_URL + 'list')
  }
  getAllAbilities(): void {
    this.httpClient
      .get<AbilityDto[]>(this.API_URL + 'list')
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
  addAbilityDto(AbilityDto: AbilityDto): void {
    // this.dialogData = advanceTable;

    this.httpClient.post(this.API_URL + 'add-AbilityDto', AbilityDto).subscribe(data => {
      this.dialogData = AbilityDto;
    },
      (err: HttpErrorResponse) => {
        // error code here
      });
  }
  updateAbilityDto(role: AbilityDto): void {
    // this.dialogData = advanceTable;

    this.httpClient.put(this.API_URL + "update-AbilityDto/" + role.id, role).subscribe(data => {
      this.dialogData = role;
    },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }
  deleteAbilityDto(id: number): void {
    console.log("service id", id);

    this.httpClient.post(this.API_URL + 'delete-AbilityDto', id).subscribe(data => {
      this.dialogData = data;
      console.log(id);
    },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }
}
