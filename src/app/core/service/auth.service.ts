import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser: Observable<User>;
  private token: string;

  public host = environment.apiUrl;
  private loggedInEmail: string;

  private jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient) {

  }



  public login(user: User): Observable<HttpResponse<User>> {


    return this.http
      .post<User>(`${this.host}/user/login`, user
        , { observe: 'response' })

  }

  logout() {
    this.token = null;
    this.loggedInEmail = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');

  }
  saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }
  addUserToLocalStorage(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserFromLocalStorage(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  loadToken(): void {
    this.token = localStorage.getItem('token')
  }

  getToken(): string {
    return this.token;
  }


  isLoggedIn(): boolean {
    this.loadToken();
    console.info(this.token)
    if (this.token != null && this.token !== '') {
      if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInEmail = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    } else {
      this.logout();
      return false;
    }
  }
}
