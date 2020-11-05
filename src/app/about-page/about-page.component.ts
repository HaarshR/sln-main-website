import { Component, OnInit, OnDestroy } from '@angular/core';

import { faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { PageData } from 'src/models/PageData';
import { NavbarService } from '../shared/navbar/navbar.service';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';
import { WebsiteInformationService } from '../shared/website-info-service';

const URL = environment.fileUrl;

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
})
export class AboutPageComponent implements OnInit, OnDestroy {
  imgUrl = URL + 'websiteInfo/';

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
  // backgroundImage: string =
  //   'https://images.unsplash.com/photo-1539946309076-4daf2ea73899?ixlib=rb-1.2.1&w=1000&q=80';
  backgroundImage;

  members = [1, 2, 3];

  isLoading = true;

  websiteInfo: any;
  private webInfoSub: Subscription;

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
        (websiteInfo) => {
          if (websiteInfo.websiteInfo) {
            this.websiteInfo = websiteInfo.websiteInfo.aboutUsPage;
            if (
              websiteInfo.websiteInfo.landingPage.joinParaImages.indexOf(
                'landingPage-climate.jpg'
              ) != -1
            ) {
              websiteInfo.websiteInfo.landingPage.joinParaImages.splice(
                websiteInfo.websiteInfo.landingPage.joinParaImages.indexOf(
                  'landingPage-climate.jpg'
                ),
                1
              );
              this.backgroundImage = 'landingPage-climate.jpg';
            } else {
              websiteInfo.websiteInfo.landingPage.joinParaImages.splice(
                websiteInfo.websiteInfo.landingPage.joinParaImages.indexOf(
                  'landingPage-climate.png'
                ),
                1
              );
              this.backgroundImage = 'landingPage-climate.png';
            }
          }
          this.isLoading = false;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  ngOnDestroy() {
    this.webInfoSub.unsubscribe();
  }
}
