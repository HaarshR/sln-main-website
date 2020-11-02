import { Component, OnInit } from '@angular/core';
import { faUser, faHandshake } from '@fortawesome/free-regular-svg-icons';

import { PageData } from 'src/models/PageData';
import { NavbarService } from '../shared/navbar/navbar.service';

@Component({
  selector: 'app-joinus-page',
  templateUrl: './joinus-page.component.html',
  styleUrls: ['./joinus-page.component.scss'],
})
export class JoinusPageComponent implements OnInit {
  private pageData: PageData = {
    navBackground: 'rgba(0,0,0, 0.7)',
    navLink: '#ffffff',
    specialNavLink: '#f89825',
    togglerColor: '#ffffff',
  };

  faUser = faUser;
  faHandshake = faHandshake;

  backgroundImage = // 'https://9to5mac.com/wp-content/uploads/sites/6/2014/07/hero_2x.jpg';
    'https://images.unsplash.com/photo-1539946309076-4daf2ea73899?ixlib=rb-1.2.1&w=1000&q=80';

  constructor(private navbarService: NavbarService) {}

  ngOnInit(): void {
    this.navbarService.setPageData(this.pageData);
  }

  onClick(memberType): void {
    if (memberType === 'regular') {
      // navigate to regular form
    } else {
      // navigate to executive form
    }
  }
}
