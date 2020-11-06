import { Component, OnInit } from '@angular/core';

import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { NavbarService } from './navbar.service';
import { PageData } from 'src/models/PageData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  // Dynamic Content
  donationPage =
    'https://www.crowdfund.mu/sov-lanatir-wakashio-2020-oil-spill-scientific-research-long-term-restoration-358.html';
  facebookPage = 'https://www.fb.com/SovLanatir';
  instagramPage = 'https://www.instagram.com/sovlanatir/';

  faBars = faBars;
  faInstagram = faInstagram;
  faFacebook = faFacebookF;

  routeUrl = '';

  pageData: PageData;

  constructor(private navbarService: NavbarService, public router: Router) {}

  ngOnInit(): void {
    this.navbarService.currentPageData.subscribe(
      (pageData) => (this.pageData = pageData)
    );
  }

  changePage(name) {
    window.scrollTo(0, 0);
    this.routeUrl = name;
  }

  getPageData(): void {}
}
