import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Member } from 'src/models/Member';

const BACKEND_URL = environment.apiUrl + 'api/members/';

@Injectable({ providedIn: 'root' })
export class MemberService {
  constructor(private http: HttpClient) {}

  getMembers(memberType: string) {
    return this.http.get<{
      members: Member[];
    }>(BACKEND_URL + 'getAll/' + memberType);
  }

  sendEmail(memberType: string, email: string, subject: string) {
    return this.http.post<{
      message: string;
    }>(BACKEND_URL + 'sendMail/' + memberType, {
      email: email,
      subject: subject,
    });
  }

  // addDepartments(department: any) {
  //   return this.http.post<{ message: string; id: string; images: string[] }>(
  //     BACKEND_URL + 'addOne',
  //     department
  //   );
  // }

  // updateDepartment(department: any, id: string) {
  //   return this.http.put<{
  //     message: string;
  //   }>(BACKEND_URL + 'updateOne/' + id, department);
  // }

  deleteMember(id: string, fileName: string) {
    return this.http.delete<{
      message: string;
    }>(BACKEND_URL + 'deleteOne/' + id);
  }
}
