import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private readonly API_URL = 'http://localhost:8081/user/';
  private token: string;

  public host = environment.apiUrl;
  private loggedInEmail: string;

  private jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public login(user: User): Observable<HttpResponse<any> | HttpErrorResponse> {

    // console.log("---" , environment.apiUrl)
    return this.http
      .post<HttpResponse<any> | HttpErrorResponse>(`${this.host}/user/login`, user
        , { observe: 'response' })
    // .pipe(
    //   map((user) => {
    //     // store user details and jwt token in local storage to keep user logged in between page refreshes
    //     console.log("---", environment.apiUrl)
    //     localStorage.setItem('currentUser', JSON.stringify(user));
    //     this.currentUserSubject.next(user);
    //     return user;
    //   })
    // );
  }

  logout() {
    // remove user from local storage to log user out
    // localStorage.removeItem('currentUser');
    // this.currentUserSubject.next(null);
    // return of({ success: false });
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
    if (this.token != null && this.token !== '') {
      if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInEmail = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    } else {
      this.logout();
    }
    return false;
  }
}
