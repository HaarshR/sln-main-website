import { Component, OnInit } from '@angular/core';
import {
  faPhone,
  faMapMarkerAlt,
  faAt,
} from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  faAt = faAt;
  faMapMarkerAlt = faMapMarkerAlt;
  faPhone = faPhone;
  faInstagram = faInstagram;
  faFacebook = faFacebookF;

  constructor() {}

  ngOnInit(): void {}
}
