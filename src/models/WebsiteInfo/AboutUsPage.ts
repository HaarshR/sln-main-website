import { TeamMember } from './TeamMember';

export interface AboutUsPage {
  details: string;
  mission: string;
  teamMembers: TeamMember[];
  galleryDetail: string;
}
