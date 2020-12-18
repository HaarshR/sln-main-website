import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { WebsiteInfo } from '../../models/WebsiteInfo/WebsiteInfo';
import { Subject } from 'rxjs';

const BACKEND_URL = environment.apiUrl + 'api/websiteInfos/';

@Injectable({ providedIn: 'root' })
export class WebsiteInformationService {
  private websiteInfo: WebsiteInfo;
  private websiteInfoStatusListener = new Subject<{
    websiteInfo: WebsiteInfo;
    message: string;
  }>();

  constructor(private http: HttpClient) {}

  getWebsiteInfo() {
    return this.websiteInfo;
  }

  getWebsiteInfoStatusListener() {
    return this.websiteInfoStatusListener.asObservable();
  }

  get() {
    this.http
      .get<{
        websiteInfo: WebsiteInfo;
      }>(BACKEND_URL + 'get')
      .subscribe(
        (next) => {
          this.websiteInfo = next.websiteInfo;
          this.websiteInfoStatusListener.next({
            websiteInfo: next.websiteInfo,
            message: 'Successfull',
          });
        },
        (error) => {
          this.websiteInfoStatusListener.next({
            websiteInfo: null,
            message: error.error.errorMessage,
          });
        }
      );
  }
}
