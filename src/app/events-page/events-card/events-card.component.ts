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

  thumbnail =
    'https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light';

  title = 'Event Title';
  department = 'IT Department';
  date = '32 December 2020';
  location = 'Trou Kanaka';

  constructor() {}

  ngOnInit(): void {}

  onClick(): void {}
}
