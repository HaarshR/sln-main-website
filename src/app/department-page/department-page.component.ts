import { Component, OnInit } from '@angular/core';

import { NavbarService } from '../shared/navbar/navbar.service';

@Component({
  selector: 'app-department-page',
  templateUrl: './department-page.component.html',
  styleUrls: ['./department-page.component.scss'],
})
export class DepartmentPageComponent implements OnInit {
  private pageData: { navBackground: string; navLink: string } = {
    navBackground: '#ffffff',
    navLink: '#000000',
  };

  departments = [1, 2, 3];

  constructor(private navbarService: NavbarService) {}

  ngOnInit(): void {
    this.navbarService.setPageData(this.pageData);
  }
}
