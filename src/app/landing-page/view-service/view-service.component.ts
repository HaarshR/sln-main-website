import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavbarService } from 'src/app/shared/navbar/navbar.service';
import { PageData } from 'src/models/PageData';

@Component({
  selector: 'app-view-service',
  templateUrl: './view-service.component.html',
  styleUrls: ['./view-service.component.scss']
})
export class ViewServiceComponent implements OnInit {
  private pageData: PageData = {
    navBackground: '#ffffff',
    navLink: '#000000',
    specialNavLink: '#546c55',
    togglerColor: '#546c55',
    visible: true,
  };

  serviceForm = new FormGroup({});
  constructor(private navbarService: NavbarService) { }

  ngOnInit(): void {
    this.navbarService.setPageData(this.pageData);
  }

}
