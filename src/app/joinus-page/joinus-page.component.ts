import { Component, OnDestroy, OnInit } from '@angular/core';
import { faUser, faHandshake } from '@fortawesome/free-regular-svg-icons';

import { PageData } from 'src/models/PageData';
import { NavbarService } from '../shared/navbar/navbar.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WebsiteInformationService } from '../shared/website-info-service';
import { environment } from 'src/environments/environment';

const URL = environment.fileUrl;

@Component({
  selector: 'app-joinus-page',
  templateUrl: './joinus-page.component.html',
  styleUrls: ['./joinus-page.component.scss'],
})
export class JoinusPageComponent implements OnInit, OnDestroy {
  imgUrl = URL;

  private pageData: PageData = {
    navBackground: 'rgba(0,0,0, 0.7)',
    navLink: '#ffffff',
    specialNavLink: '#f89825',
    togglerColor: '#ffffff',
    visible: true,
  };

  faUser = faUser;
  faHandshake = faHandshake;

  // backgroundImage = // 'https://9to5mac.com/wp-content/uploads/sites/6/2014/07/hero_2x.jpg';
  //   'https://images.unsplash.com/photo-1539946309076-4daf2ea73899?ixlib=rb-1.2.1&w=1000&q=80';

  isLoading = true;

  websiteInfo: any;
  private webInfoSub: Subscription;

  constructor(
    private websiteInformationService: WebsiteInformationService,
    private navbarService: NavbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.navbarService.setPageData(this.pageData);
    this.websiteInformationService.get();
    this.webInfoSub = this.websiteInformationService
      .getWebsiteInfoStatusListener()
      .subscribe(
        (next) => {
          if (next.websiteInfo) {
            this.websiteInfo = next.websiteInfo.joinUsPage;
          }
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
        }
      );
  }

  onClick(memberType): void {
    if (memberType === 'regular') {
      this.router.navigate(['join-us/regular']);
    } else {
      this.router.navigate(['join-us/executive']);
    }
  }

  ngOnDestroy(): void {
    this.webInfoSub.unsubscribe();
  }
}
