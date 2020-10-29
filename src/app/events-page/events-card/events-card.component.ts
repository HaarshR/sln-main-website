import { Component, OnInit } from '@angular/core';

import {
  faCalendarAlt,
  faMapMarkerAlt,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-events-card',
  templateUrl: './events-card.component.html',
  styleUrls: ['./events-card.component.scss'],
})
export class EventsCardComponent implements OnInit {
  faCalendarAlt = faCalendarAlt;
  faMapMarkerAlt = faMapMarkerAlt;
  faPlay = faPlay;

  constructor() {}

  ngOnInit(): void {}
}
