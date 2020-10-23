import { Component } from '@angular/core';
import { faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  faInstagram = faInstagram;
  faFacebook = faFacebookF;

  title = 'sln-website';
}
