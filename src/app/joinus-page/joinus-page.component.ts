import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-regular-svg-icons'

@Component({
  selector: 'app-joinus-page',
  templateUrl: './joinus-page.component.html',
  styleUrls: ['./joinus-page.component.scss']
})
export class JoinusPageComponent implements OnInit {
  faUser = faUser;
  
  backgroundImage: string = //'https://9to5mac.com/wp-content/uploads/sites/6/2014/07/hero_2x.jpg';
    'https://images.unsplash.com/photo-1539946309076-4daf2ea73899?ixlib=rb-1.2.1&w=1000&q=80';

  constructor() { }

  ngOnInit(): void {
  }

}
