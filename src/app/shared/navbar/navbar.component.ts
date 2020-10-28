import { Component, OnInit } from '@angular/core';

import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  // Dynamic Content
  facebookPage = 'https://www.fb.com/SovLanatir';
  instagramPage = 'https://www.instagram.com/sovlanatir/';

  faBars = faBars;
  faInstagram = faInstagram;
  faFacebook = faFacebookF;

  pageData: { title: string };

  constructor(private navbarService: NavbarService) {}

  ngOnInit(): void {
    this.navbarService.currentPageData.subscribe(
      (pageData) => (this.pageData = pageData)
    );
    // this.getPageData();
    console.log(this.pageData);
  }

  getPageData(): void {}
}
