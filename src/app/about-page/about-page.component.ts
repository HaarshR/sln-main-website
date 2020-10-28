import { Component, OnInit } from '@angular/core';

import { faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { PageData } from 'src/models/PageData';
import { NavbarService } from '../shared/navbar/navbar.service';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
})
export class AboutPageComponent implements OnInit {
  private pageData: PageData = {
    navBackground: 'rgba(0,0,0, 0.7)',
    navLink: '#ffffff',
    specialNavLink: '#f89825',
  };

  faInstagram = faInstagram;
  faFacebook = faFacebookF;

  facebookPage = 'https://www.fb.com/SovLanatir';
  instagramPage = 'https://www.instagram.com/sovlanatir/';

  // Dynamic Content
  backgroundImage: string =
    'https://images.unsplash.com/photo-1539946309076-4daf2ea73899?ixlib=rb-1.2.1&w=1000&q=80';

  members = [1, 2, 3];

  constructor(private navbarService: NavbarService) {}

  ngOnInit(): void {
    this.navbarService.setPageData(this.pageData);
  }
}
