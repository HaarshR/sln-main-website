import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + 'api/members/';

@Injectable({ providedIn: 'root' })
export class JoinusMemberService {
  constructor(private http: HttpClient) {}

  add(member) {
    return this.http.post<{
      message: string;
    }>(BACKEND_URL + 'addRegular', member);
  }
}
