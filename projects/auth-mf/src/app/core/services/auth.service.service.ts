import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/host-app/src/environments/environment';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { AuthStateService } from './auth-state.service';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  apiBaseUrl = `${environment.apiBaseUrl}`;
  public baseResourceUrl!: string;
  public authSubject: BehaviorSubject<Auth>;

  private authObservable: Observable<Auth>;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  constructor(
    private http: HttpClient,
    private stateService: AuthStateService
  ) {
    this.loggedIn = new BehaviorSubject<boolean>(
      Boolean(localStorage.getItem('isLoggedIn'))
    );

    // Get the value from localStorage
    const storedValue = localStorage.getItem('auth');

    // Check if the stored value is not null
    const initialValue = storedValue ? JSON.parse(storedValue) : null;

    // Create the BehaviorSubject with the initial value
    this.authSubject = new BehaviorSubject<any>(initialValue);
    // this.authSubject = new BehaviorSubject<Auth>(
    //   JSON.parse(localStorage.getItem('auth'))
    // );
    this.stateService.baseResource.subscribe((res) => {
      this.baseResourceUrl = res;
    });
    this.authObservable = this.authSubject.asObservable();
  }

  setIsLoggedIn(value: boolean): void {
    this.loggedIn.next(value);
  }

  getTime() {
    return this.http.get<any>('http://192.168.4.42:8080/getAllTimezone');
  }

  get authData(): Auth {
    return this.authSubject.value;
  }

  login(
    username: string,
    password: string,
    flag: boolean,
    uid: string
  ): Observable<User> {
    return this.http
      .post<User>(`${this.apiBaseUrl}/authenticate`, {
        username,
        password,
        flag,
        uid,
      })
      .pipe(
        map((auth: User) => {
          localStorage.setItem('isLoggedIn', 'true');
          this.setIsLoggedIn(true);
          return auth;
        })
      );
  }

  OtpAuthenticate(
    username: string,
    password: string,
    flag: boolean,
    uid: string
  ): Observable<Auth> {
    return this.http
      .post<Auth>(`${this.apiBaseUrl}/otpauthenticate`, {
        username,
        password,
        flag,
        uid,
      })
      .pipe(
        map((auth: Auth) => {
          /**
           * TODO : get permissions from the api
           */
          const userRole = auth.userDetails?.userRole;
          // if (
          //   userRole === 'RPM_ADMIN' ||
          //   userRole === 'BRANCH_USER' ||
          //   userRole === 'hospital_USER'
          // ) {
          //   auth.userDetails.permissions =
          //     UserPermissionGroups[userRole].permissions;
          // }
          localStorage.setItem('auth', JSON.stringify(auth));
          localStorage.setItem('isLoggedIn', 'true');
          let inputString = auth.baseResourcePath;
          if (inputString?.startsWith('/')) {
            inputString = inputString.substring(1);
          }
          localStorage.setItem('baseResource', inputString ?? '');
          if (inputString) {
            this.stateService.setBaseResource(inputString);
          }
          this.authSubject.next(auth);
          this.setIsLoggedIn(true);
          return auth;
        })
      );
  }
}
