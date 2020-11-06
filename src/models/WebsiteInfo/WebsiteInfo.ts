import { LandingPage } from './LandingPage';
import { DepartmentPage } from './DepartmentPage';
import { AboutUsPage } from './AboutUsPage';
import { TeamMember } from './TeamMember';

export interface WebsiteInfo {
  _id: string;
  landingPage: LandingPage;
  departmentPage: DepartmentPage;
  aboutUsPage: AboutUsPage;
  teamMembers: TeamMember[];
}
