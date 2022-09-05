import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  private readonly API_URL = 'http://localhost:8080/api/';

  constructor(private httpClient: HttpClient) { }

  resetPassword(email : string){
    return this.httpClient.post(this.API_URL+"",email)
  }
}
