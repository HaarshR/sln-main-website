import { Component, OnInit } from '@angular/core';
import { EventModel } from 'src/models/EventModel';
import { PageData } from 'src/models/PageData';
import { NavbarService } from '../shared/navbar/navbar.service';
@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss'],
})
export class EventsPageComponent implements OnInit {
  private pageData: PageData = {
    navBackground: '#ffffff',
    navLink: '#000000',
    specialNavLink: '#546c55',
    togglerColor: '#546c55',
    visible: true,
  };

  upcomingEvents: EventModel[] = [
    {
      _id: '1',
      date: new Date('11/07/2020'),
      departmentName: 'IT Department',
      name: 'Website Launch',
      description: "An awesome IT event for the website's launch",
      location: 'SD Worx',
      logo:
        'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
      images: [],
    },
  ];

  pastEvents: EventModel[] = [
    {
      _id: '1',
      date: new Date('10/13/2020'),
      departmentName: 'IT Department',
      name: 'Website Discussion',
      description: 'Meeting discussion for a public website',
      location: 'Zoom Cloud Meetings',
      logo:
        'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      images: [],
    },
  ];

  constructor(private navbarService: NavbarService) {}

  ngOnInit(): void {
    this.navbarService.setPageData(this.pageData);
  }
}
