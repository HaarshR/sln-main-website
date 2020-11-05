import { Component, OnInit, OnDestroy } from '@angular/core';
import { from, Subscription } from 'rxjs';
import { PageData } from 'src/models/PageData';
import { NavbarService } from '../shared/navbar/navbar.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { WebsiteInformationService } from '../shared/website-info-service';
import { environment } from '../../environments/environment';

const URL = environment.fileUrl;

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  providers: [NgbCarouselConfig],
})
export class LandingPageComponent implements OnInit, OnDestroy {
  imgUrl = URL + 'websiteInfo/';

  showNavigationArrows = false;
  showNavigationIndicators = false;
  // images = [1055, 194, 368].map(
  //   (n) => `https://picsum.photos/id/${n}/1500/600`
  // );

  private pageData: PageData = {
    navBackground: 'rgba(0,0,0,0.7)',
    navLink: '#ffffff',
    specialNavLink: '#f89825',
    togglerColor: '#ffffff',
    visible: true,
  };
  // Dynamic content
  backgroundImage;

  isLoading = true;

  websiteInfo: any;
  private webInfoSub: Subscription;

  constructor(
    private navbarService: NavbarService,
    config: NgbCarouselConfig,
    private websiteInformationService: WebsiteInformationService
  ) {
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
  }

  ngOnInit(): void {
    this.navbarService.setPageData(this.pageData);
    if (!this.websiteInformationService.getWebsiteInfo()) {
      this.websiteInformationService.get();
    }
    this.webInfoSub = this.websiteInformationService
      .getWebsiteInfoStatusListener()
      .subscribe((websiteInfo) => {
        if (websiteInfo.websiteInfo) {
          this.websiteInfo = websiteInfo.websiteInfo.landingPage;
          if (
            this.websiteInfo.joinParaImages.indexOf(
              'landingPage-climate.jpg'
            ) != -1
          ) {
            this.websiteInfo.joinParaImages.splice(
              this.websiteInfo.joinParaImages.indexOf(
                'landingPage-climate.jpg'
              ),
              1
            );
            this.backgroundImage = 'landingPage-climate.jpg';
          } else {
            this.websiteInfo.joinParaImages.splice(
              this.websiteInfo.joinParaImages.indexOf(
                'landingPage-climate.png'
              ),
              1
            );
            this.backgroundImage = 'landingPage-climate.png';
          }
          this.isLoading = false;
        }
      });
  }

  ngOnDestroy() {
    this.webInfoSub.unsubscribe();
  }
}
