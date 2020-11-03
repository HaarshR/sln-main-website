import { Component, OnInit } from '@angular/core';
import { PageData } from 'src/models/PageData';

import { NavbarService } from '../shared/navbar/navbar.service';

@Component({
  selector: 'app-department-page',
  templateUrl: './department-page.component.html',
  styleUrls: ['./department-page.component.scss'],
})
export class DepartmentPageComponent implements OnInit {
  private pageData: PageData = {
    navBackground: '#ffffff',
    navLink: '#000000',
    specialNavLink: '#546c55',
    togglerColor: '#546c55',
    visible: true,
  };

  departments = [1, 2, 3, 4, 5];

  constructor(private navbarService: NavbarService) {}

  ngOnInit(): void {
    this.navbarService.setPageData(this.pageData);
  }
}
