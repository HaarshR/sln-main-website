import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavbarService } from 'src/app/shared/navbar/navbar.service';
import { PageData } from 'src/models/PageData';

@Component({
  selector: 'app-regular-member-page',
  templateUrl: './regular-member-page.component.html',
  styleUrls: ['./regular-member-page.component.scss'],
})
export class RegularMemberPageComponent implements OnInit {
  private pageData: PageData = {
    navBackground: '#ffffff',
    navLink: '#000000',
    specialNavLink: '#546c55',
    togglerColor: '#546c55',
  };

  regularMemberForm = new FormGroup({});

  constructor(private navbarService: NavbarService) {}

  ngOnInit(): void {
    this.navbarService.setPageData(this.pageData);
  }
}
