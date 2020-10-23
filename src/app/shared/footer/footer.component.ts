import { Component, OnInit } from '@angular/core';
import { faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  faInstagram = faInstagram;
  faFacebook = faFacebookF;

  constructor() {}

  ngOnInit(): void {}
}
