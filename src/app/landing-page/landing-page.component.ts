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

  private pageData: PageData = {
    navBackground: 'rgba(0,0,0,0.7)',
    navLink: '#ffffff',
    specialNavLink: '#f89825',
    togglerColor: '#ffffff',
    visible: true,
  };
  // Dynamic content
  backgroundImage;

  services: { title: string; thumbnail: string }[] = [
    {
      title: 'Find a home for stray animals',
      thumbnail:
        'https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    },
    {
      title: 'Notify about waste pollution',
      thumbnail:
        'https://images.unsplash.com/photo-1562077981-4d7eafd44932?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    },
  ];

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
    this.websiteInformationService.get();
    this.webInfoSub = this.websiteInformationService
      .getWebsiteInfoStatusListener()
      .subscribe(
        (next) => {
          if (next.websiteInfo) {
            this.websiteInfo = next.websiteInfo.landingPage;
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
