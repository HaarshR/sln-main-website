import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { EventModel } from '../../../models/EventModel';

const BACKEND_URL = environment.apiUrl + 'api/events/';

@Injectable({ providedIn: 'root' })
export class EventService {
  constructor(private http: HttpClient) {}

  getEvents() {
    return this.http.get<{
      events: EventModel[];
    }>(BACKEND_URL + 'getAll');
  }

  addEvent(event: any) {
    return this.http.post<{ message: string; id: string; logo: string }>(
      BACKEND_URL + 'addOne',
      event
    );
  }

  // updateDepartment(department: any, id: string) {
  //   return this.http.put<{
  //     message: string;
  //   }>(BACKEND_URL + 'updateOne/' + id, department);
  // }

  deleteEvent(id: string, name: string, image: string) {
    return this.http.delete<{
      message: string;
    }>(BACKEND_URL + 'deleteOne/' + id + '&' + name + '&' + image);
  }
}
