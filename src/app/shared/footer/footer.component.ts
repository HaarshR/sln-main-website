import { Component, OnInit } from '@angular/core';
import {
  faPhone,
  faMapMarkerAlt,
  faInbox,
} from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  // Dynamic Content
  address = 'Sheemadree Lane, Ecroignard';
  phone = '+230 12345678';
  email = 'sovlanatir@gmail.com';
  facebookPage = 'https://www.fb.com/SovLanatir';
  instagramPage = 'https://www.instagram.com/sovlanatir/';

  faInbox = faInbox;
  faMapMarkerAlt = faMapMarkerAlt;
  faPhone = faPhone;
  faInstagram = faInstagram;
  faFacebook = faFacebookF;

  constructor() {}

  ngOnInit(): void {}
}
