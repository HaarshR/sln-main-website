import { LandingPage } from './LandingPage';
import { DepartmentPage } from './DepartmentPage';
import { AboutUsPage } from './AboutUsPage';

export interface WebsiteInfo {
  _id: string;
  landingPage: LandingPage;
  departmentPage: DepartmentPage;
  aboutUsPage: AboutUsPage;
}
