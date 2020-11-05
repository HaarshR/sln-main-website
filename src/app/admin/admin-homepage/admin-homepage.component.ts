import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/shared/navbar/navbar.service';
import { PageData } from 'src/models/PageData';
import { AuthService } from '../admin-login/auth.service';

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.scss'],
})
export class AdminHomepageComponent implements OnInit {
  private pageData: PageData = {
    navBackground: '',
    navLink: '',
    specialNavLink: '',
    togglerColor: '',
    visible: false,
  };

  constructor(
    private authService: AuthService,
    private navbarService: NavbarService
  ) {
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {
    this.navbarService.setPageData(this.pageData);
  }

  logout() {
    this.authService.logout();
  }
}
