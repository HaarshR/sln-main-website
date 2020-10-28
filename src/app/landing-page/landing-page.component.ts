import { Component, OnInit } from '@angular/core';
import { PageData } from 'src/models/PageData';
import { NavbarService } from '../shared/navbar/navbar.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  private pageData: PageData = {
    navBackground: 'rgba(0,0,0,0.7)',
    navLink: '#ffffff',
    specialNavLink: '#f89825',
  };
  // Dynamic content
  backgroundImage =
    'https://images.unsplash.com/photo-1539946309076-4daf2ea73899?ixlib=rb-1.2.1&w=1000&q=80';

  constructor(private navbarService: NavbarService) {}

  ngOnInit(): void {
    this.navbarService.setPageData(this.pageData);
  }
}
