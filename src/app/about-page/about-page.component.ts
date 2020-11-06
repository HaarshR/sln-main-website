import { Component, OnInit, OnDestroy } from '@angular/core';

import { faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { PageData } from 'src/models/PageData';
import { NavbarService } from '../shared/navbar/navbar.service';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';
import { WebsiteInformationService } from '../shared/website-info-service';
import { TeamMember } from 'src/models/WebsiteInfo/TeamMember';

const URL = environment.fileUrl;

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
})
export class AboutPageComponent implements OnInit, OnDestroy {
  imgUrl = URL;

  private pageData: PageData = {
    navBackground: 'rgba(0,0,0, 0.7)',
    navLink: '#ffffff',
    specialNavLink: '#f89825',
    togglerColor: '#ffffff',
    visible: true,
  };

  faInstagram = faInstagram;
  faFacebook = faFacebookF;

  facebookPage = 'https://www.fb.com/SovLanatir';
  instagramPage = 'https://www.instagram.com/sovlanatir/';

  // Dynamic Content

  members: TeamMember[];

  isLoading = true;

  websiteInfo: any;
  private webInfoSub: Subscription;

  gallery: string[] = [
    'https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1511576661531-b34d7da5d0bb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1433838552652-f9a46b332c40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  ];

  constructor(
    private navbarService: NavbarService,
    private websiteInformationService: WebsiteInformationService
  ) {}

  ngOnInit(): void {
    this.navbarService.setPageData(this.pageData);
    this.websiteInformationService.get();
    this.webInfoSub = this.websiteInformationService
      .getWebsiteInfoStatusListener()
      .subscribe(
        (next) => {
          if (next.websiteInfo) {
            this.websiteInfo = next.websiteInfo.aboutUsPage;
            this.members = next.websiteInfo.teamMembers;
            console.log(this.members);
          }
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
        }
      );
  }

  ngOnDestroy(): void {
    this.webInfoSub.unsubscribe();
  }
}
