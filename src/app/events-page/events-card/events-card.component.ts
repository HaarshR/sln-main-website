import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  faCalendarAlt,
  faMapMarkerAlt,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
import { EventModel } from 'src/models/EventModel';

@Component({
  selector: 'app-events-card',
  templateUrl: './events-card.component.html',
  styleUrls: ['./events-card.component.scss'],
})
export class EventsCardComponent implements OnInit {
  @Input() event: EventModel;

  faCalendarAlt = faCalendarAlt;
  faMapMarkerAlt = faMapMarkerAlt;
  faPlay = faPlay;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onClick(): void {
    this.router.navigateByUrl('/events/ve');
  }
}
