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
  private readonly API_URL = 'http://localhost:8080/authorizations/';

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
  getAllAuthorization(): Observable<Authorization[]> {
    return this.httpClient.get<Authorization[]>(this.API_URL + 'list')
  }
}
