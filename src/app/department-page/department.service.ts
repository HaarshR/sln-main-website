import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Blog } from 'src/models/Blogs/Blog';
import { Subject } from 'rxjs';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { Department } from 'src/models/Department';

const BACKEND_URL = environment.apiUrl + 'api/departments/';

@Injectable({ providedIn: 'root' })
export class DepartmentService {
  private departments: Department[];
  private departmentsStatusListener = new Subject<{
    departments: Department[];
  }>();

  constructor(private http: HttpClient) {}

  getDepartments() {
    return this.departments;
  }

  getWebsiteInfoStatusListener() {
    return this.departmentsStatusListener.asObservable();
  }

  setDepartments() {
    this.http
      .get<{
        departments: Department[];
      }>(BACKEND_URL + 'getAll')
      .subscribe(
        (next) => {
          this.departments = next.departments;
          this.departmentsStatusListener.next({
            departments: [...next.departments],
          });
        },
        (error) => {
          this.departmentsStatusListener.next({
            departments: [],
          });
        }
      );
  }
}
