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

  private token: string;

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
        token: string;
        adminID: string;
        adminEMAIL: string;
      }>(BACKEND_URL + 'login/', admin)
      .subscribe(
        (response) => {
          const token = response.token;
          this.token = token;
          if (token) {
            this.adminID = response.adminID;
            this.adminEMAIL = response.adminEMAIL;
            this.isAuthenticated = true;
            this.authErrorListener.next({
              message: 'Successfull',
              isError: false,
            });
            this.authStatusListener.next(this.isAuthenticated);
            this.saveAuthData();
          }
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
    this.token = null;
    this.adminID = null;
    this.adminEMAIL = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(this.isAuthenticated);
    this.clearAuthData();
    if (this.router.url.includes('admin/home')) {
      this.router.navigate(['admin']);
    } else {
      window.location.reload();
    }
  }

  updateDepartment(department: any, id: string) {
    return this.http.put<{
      message: string;
    }>(BACKEND_URL + 'updatePassword/' + id, department);
  }

  autoAuthUser() {
    const authInfomation = this.getAuthData();
    if (!authInfomation) {
      return;
    } else {
      this.token = authInfomation.token;
      this.adminID = authInfomation.adminID;
      this.adminEMAIL = authInfomation.adminEMAIL;
      this.isAuthenticated = true;
      this.authStatusListener.next(this.isAuthenticated);
    }
  }

  private saveAuthData() {
    sessionStorage.setItem('token', this.token);
    sessionStorage.setItem('adminID', this.adminID);
    sessionStorage.setItem('adminEMAIL', this.adminEMAIL);
  }

  private clearAuthData() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('adminID');
    sessionStorage.removeItem('adminEMAIL');
  }

  private getAuthData() {
    const token = sessionStorage.getItem('token');
    const adminID = sessionStorage.getItem('adminID');
    const adminEMAIL = sessionStorage.getItem('adminEMAIL');
    if (!token || !adminID || !adminEMAIL) {
      return;
    } else {
      return {
        token,
        adminID,
        adminEMAIL,
      };
    }
  }
}
