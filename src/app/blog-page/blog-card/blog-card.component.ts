import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { faCommentAlt, faEye } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss'],
})
export class BlogCardComponent implements OnInit {
  faCommentAlt = faCommentAlt;
  faEye = faEye;

  cardStyle: {
    primaryText: string;
    secondaryText: string;
    backgroundColor: string;
  } = {
    primaryText: '#ffffff',
    secondaryText: '#ffffff',
    backgroundColor: '#30B2DB',
  };

  authorImg =
    'https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light';
  author = 'John Doe';
  date = '32 December 2020';
  title = 'Card Title';
  subtitle =
    'So this is a brief description of what is written in this article. May be used to lure readers in.';
  views = 3;
  comments = 6;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onClick(): void {
    this.router.navigateByUrl('blog/vb');
  }
}
