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

  //dynamic background images merge one
  mergeImage1: string = 'https://storage.googleapis.com/planet4-new-zealand-stateless/2020/04/2aa8ebf4-gp0stotnr_pressmedia-1024x576.jpg';
  mergeImage2: string = 'https://idausa.lattecdn.com//assets/components/phpthumbof/cache/plastic-resized-10.18.18.103220a9fc0a89b5ae6c85ab530bf1c3.jpg';
    
  constructor() {}

  ngOnInit(): void {}
}
