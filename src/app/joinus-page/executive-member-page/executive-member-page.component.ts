import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavbarService } from 'src/app/shared/navbar/navbar.service';
import { PageData } from 'src/models/PageData';

@Component({
  selector: 'app-executive-member-page',
  templateUrl: './executive-member-page.component.html',
  styleUrls: ['./executive-member-page.component.scss'],
})
export class ExecutiveMemberPageComponent implements OnInit {
  private pageData: PageData = {
    navBackground: '#ffffff',
    navLink: '#000000',
    specialNavLink: '#546c55',
  };

  executiveMemberForm = new FormGroup({});
  constructor(private navbarService: NavbarService) {}

  ngOnInit(): void {
    this.navbarService.setPageData(this.pageData);
  }
}
