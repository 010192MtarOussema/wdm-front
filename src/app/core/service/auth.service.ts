import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../interceptor/user';
import { JwtResponse } from 'src/app/models/JwtResponse';
// import { User } from 'src/app/models/user';
const AUTH_API = 'http://localhost:8080/user/';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<JwtResponse>;
  public currentUser: Observable<JwtResponse>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<JwtResponse>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): JwtResponse {
    return this.currentUserSubject.value;
  }
  login(email: string, passeword: string) {
    return this.http.post<any>(
      AUTH_API + 'signin',
      {
        email,
        passeword,
      }).pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes

          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }
}

  // public currentUser: Observable<User>;
  // private token: string;

  // public host = environment.apiUrl;
  // private loggedInEmail: string;

  // private jwtHelper = new JwtHelperService();
  // constructor(private http: HttpClient) {

  // }



  // public login(user: User): Observable<HttpResponse<User>> {


  //   return this.http
  //     .post<User>(`${this.host}/user/login`, user
  //       , { observe: 'response' })

  // }

  // logout() {
  //   this.token = null;
  //   this.loggedInEmail = null;
  //   localStorage.removeItem('user');
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('users');

  // }
  // saveToken(token: string): void {
  //   this.token = token;
  //   localStorage.setItem('token', token);
  // }
  // addUserToLocalStorage(user: User): void {
  //   localStorage.setItem('user', JSON.stringify(user));
  // }

  // getUserFromLocalStorage(): User {
  //   return JSON.parse(localStorage.getItem('user'));
  // }

  // loadToken(): void {
  //   this.token = localStorage.getItem('token')
  // }

  // getToken(): string {
  //   return this.token;
  // }


  // isLoggedIn(): boolean {
  //   this.loadToken();
  //   if (this.token != null && this.token !== '') {
  //     if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
  //       if (!this.jwtHelper.isTokenExpired(this.token)) {
  //         this.loggedInEmail = this.jwtHelper.decodeToken(this.token).sub;
  //         return true;
  //       }
  //     }
  //   } else {
  //     this.logout();
  //     return false;
  //   }
  // }

//   private currentUserSubject: BehaviorSubject<User>;
//   public currentUser: Observable<User>;

//   constructor(private http: HttpClient) {
//     this.currentUserSubject = new BehaviorSubject<User>(
//       JSON.parse(localStorage.getItem('currentUser'))
//     );
//     this.currentUser = this.currentUserSubject.asObservable();
//   }

//   public get currentUserValue(): User {
//     return this.currentUserSubject.value;
//   }

//   login(username: string, password: string) {
//     return this.http
//       .post<any>(`${environment.apiUrl}/authenticate`, {
//         username,
//         password
//       })
//       .pipe(
//         map((user) => {
//           // store user details and jwt token in local storage to keep user logged in between page refreshes

//           localStorage.setItem('currentUser', JSON.stringify(user));
//           this.currentUserSubject.next(user);
//           return user;
//         })
//       );
//   }

//   logout() {
//     // remove user from local storage to log user out
//     localStorage.removeItem('currentUser');
//     this.currentUserSubject.next(null);
//     return of({ success: false });
//   }
// }
