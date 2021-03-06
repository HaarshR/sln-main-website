import { Component, OnInit } from '@angular/core';
import {
  faPhone,
  faMapMarkerAlt,
  faInbox,
} from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavbarService } from '../navbar/navbar.service';
import { PageData } from 'src/models/PageData';
import { JoinusMemberService } from 'src/app/joinus-page/joinus-member-service';

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

  subscribeForm = new FormGroup({
    email: new FormControl('', {
      validators: [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    }),
  });
  contactUsForm = new FormGroup({});

  pageData: PageData;

  isAddingEmail = false;
  constructor(
    private navbarService: NavbarService,
    private joinusService: JoinusMemberService
  ) {}

  ngOnInit(): void {
    this.navbarService.currentPageData.subscribe(
      (pageData) => (this.pageData = pageData)
    );
  }

  register() {
    if (!this.subscribeForm.value.email || !this.subscribeForm.valid) {
      return;
    }

    this.isAddingEmail = true;

    this.joinusService.addOther(this.subscribeForm.value.email).subscribe(
      (next) => {
        alert(next.message);
        this.isAddingEmail = false;
      },
      (error) => {
        alert(error.error.errorMessage);
        this.isAddingEmail = false;
      }
    );
  }
}
