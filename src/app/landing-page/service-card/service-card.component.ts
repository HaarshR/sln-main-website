import { Component, Input, OnInit } from '@angular/core';

import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss'],
})
export class ServiceCardComponent implements OnInit {
  @Input() service: { title: string; thumbnail: string };
  faChevronCircleRight = faChevronCircleRight;

  constructor() {}

  ngOnInit(): void {}

  onClick(): void {}
}
