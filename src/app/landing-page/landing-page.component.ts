import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  // Dynamic content
  backgroundImage: string =
    'https://images.unsplash.com/photo-1539946309076-4daf2ea73899?ixlib=rb-1.2.1&w=1000&q=80';

  constructor() {}

  ngOnInit(): void {}
}
