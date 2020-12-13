import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + 'api/members/';

@Injectable({ providedIn: 'root' })
export class JoinusMemberService {
  constructor(private http: HttpClient) {}

  addRegular(member) {
    return this.http.post<{
      message: string;
    }>(BACKEND_URL + 'addRegular', member);
  }

  addExecutive(member, cv) {
    const newExecutiveMemberForm = new FormData();
    newExecutiveMemberForm.append('firstname', member.value.firstname);
    newExecutiveMemberForm.append('lastname', member.value.lastname);
    newExecutiveMemberForm.append(
      'dob',
      new Date(
        member.value.dob.month +
          '/' +
          member.value.dob.day +
          '/' +
          member.value.dob.year
      ).toISOString()
    );
    newExecutiveMemberForm.append('email', member.value.email);
    newExecutiveMemberForm.append('phoneNumber', member.value.phoneNumber);
    newExecutiveMemberForm.append(
      'educInstitution',
      member.value.educInstitution
    );
    newExecutiveMemberForm.append('fieldOfStudy', member.value.fieldOfStudy);
    newExecutiveMemberForm.append('question1', member.value.question1);
    newExecutiveMemberForm.append('question2', member.value.question2);
    newExecutiveMemberForm.append('question3', member.value.question3);
    newExecutiveMemberForm.append('question4', member.value.question4);
    newExecutiveMemberForm.append('question5', member.value.question5);
    newExecutiveMemberForm.append('question6', member.value.question6);
    newExecutiveMemberForm.append('departments', member.value.departments);
    newExecutiveMemberForm.append('social', member.value.social);
    newExecutiveMemberForm.append('cv', cv, member.value.email);

    return this.http.post<{
      message: string;
    }>(BACKEND_URL + 'addExecutive', newExecutiveMemberForm);
  }

  addOther(email) {
    return this.http.post<{
      message: string;
    }>(BACKEND_URL + 'addOther', { email: email });
  }
}
