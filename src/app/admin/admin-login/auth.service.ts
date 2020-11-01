import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

const BACKEND_URL = environment.apiUrl + 'api/admins/';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private adminID: string;
  private adminEMAIL: string;

  private isAuthenticated = false; // Stores true/false for user logged in or not
  private authStatusListener = new Subject<boolean>();
  private authErrorListener = new Subject<{
    message: string;
    isError: boolean;
  }>();

  constructor(private http: HttpClient, private router: Router) {}

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getAuthErrorListener() {
    return this.authErrorListener.asObservable();
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  login(admin: any) {
    console.log(admin);
    this.http
      .post<{
        adminID: string;
        adminEMAIL: string;
      }>(BACKEND_URL + 'login/', admin)
      .subscribe(
        (response) => {
          this.adminID = response.adminID;
          this.adminEMAIL = response.adminEMAIL;
          this.isAuthenticated = true;
          this.authErrorListener.next({
            message: 'Successfull',
            isError: false,
          });
          this.authStatusListener.next(this.isAuthenticated);
          this.saveAuthData();
          this.http.get(BACKEND_URL + 'getLogin/').subscribe();
        },
        (error) => {
          this.authErrorListener.next({
            message: error.error.errorMessage,
            isError: true,
          });
          this.authStatusListener.next(false);
        }
      );
  }

  logout() {
    this.adminID = null;
    this.adminEMAIL = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(this.isAuthenticated);
    this.clearAuthData();
    this.router.navigate(['/admin']);
  }

  updatePassword(department: any, id: string) {
    return this.http.put<{
      message: string;
    }>(BACKEND_URL + 'updatePassword/' + id, department, {
      withCredentials: true,
    });
  }

  autoAuthUser() {
    const authInfomation = this.getAuthData();
    if (!authInfomation) {
      return;
    } else {
      this.adminID = authInfomation.adminID;
      this.adminEMAIL = authInfomation.adminEMAIL;
      this.isAuthenticated = true;
      this.authStatusListener.next(this.isAuthenticated);
    }
  }

  private saveAuthData() {
    sessionStorage.setItem('adminID', this.adminID);
    sessionStorage.setItem('adminEMAIL', this.adminEMAIL);
  }

  private clearAuthData() {
    sessionStorage.removeItem('adminID');
    sessionStorage.removeItem('adminEMAIL');
  }

  private getAuthData() {
    const adminID = sessionStorage.getItem('adminID');
    const adminEMAIL = sessionStorage.getItem('adminEMAIL');
    if (!adminID || !adminEMAIL) {
      return;
    } else {
      return {
        adminID,
        adminEMAIL,
      };
    }
  }
}
