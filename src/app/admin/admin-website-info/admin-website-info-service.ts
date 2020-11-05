import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { WebsiteInfo } from '../../../models/WebsiteInfo/WebsiteInfo';
import { TeamMember } from 'src/models/WebsiteInfo/TeamMember';

const BACKEND_URL = environment.apiUrl + 'api/websiteInfos/';

@Injectable({ providedIn: 'root' })
export class WebsiteInfoService {
  constructor(private http: HttpClient) {}

  getWebsiteInfo() {
    return this.http.get<{
      websiteInfo: WebsiteInfo;
    }>(BACKEND_URL + 'get');
  }

  updateDepartmentPage(id: string, detail: string) {
    return this.http.put<{
      message: string;
    }>(BACKEND_URL + 'update/' + id, {
      departmentPage: {
        detail: detail,
      },
    });
  }

  updateLandingPage(id: string, landingPage: any) {
    return this.http.put<{
      message: string;
    }>(BACKEND_URL + 'updateLanding/' + id, landingPage);
  }

  updateAboutUs(id: string, aboutUsPage: any) {
    return this.http.put<{
      message: string;
    }>(BACKEND_URL + 'update/' + id, {
      aboutUsPage: {
        details: aboutUsPage.details,
        mission: aboutUsPage.mission,
        galleryDetail: aboutUsPage.galleryDetail,
      },
    });
  }
}
