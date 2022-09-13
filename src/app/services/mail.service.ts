import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  private readonly API_URL = 'http://localhost:8080/api/';

  constructor(private httpClient: HttpClient) { }

  resetPassword(email : string){


    return this.httpClient.get<User>(this.API_URL+"sendmail/"+email )
  }
}
