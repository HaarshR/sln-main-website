import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Department } from '../../../models/Department';

const BACKEND_URL = environment.apiUrl + 'api/departments/';

@Injectable({ providedIn: 'root' })
export class DepartmentService {
  constructor(private http: HttpClient) {}

  getDepartments() {
    return this.http.get<{
      departments: Department[];
    }>(BACKEND_URL + 'getAll');
  }

  addDepartments(department: any) {
    return this.http.post<{ message: string; id: string; images: string[] }>(
      BACKEND_URL + 'addOne',
      department
    );
  }

  updateDepartment(department: any, id: string) {
    return this.http.put<{
      message: string;
    }>(BACKEND_URL + 'updateOne/' + id, department);
  }

  deleteDepartment(id: string) {
    return this.http.delete<{
      message: string;
    }>(BACKEND_URL + 'deleteOne/' + id);
  }
}
