import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavbarService } from 'src/app/shared/navbar/navbar.service';
import { PageData } from 'src/models/PageData';

@Component({
  selector: 'app-executive-member-page',
  templateUrl: './executive-member-page.component.html',
  styleUrls: ['./executive-member-page.component.scss'],
})
export class ExecutiveMemberPageComponent implements OnInit {
  private pageData: PageData = {
    navBackground: '#ffffff',
    navLink: '#000000',
    specialNavLink: '#546c55',
    togglerColor: '#546c55',
    visible: true,
  };

  executiveMemberForm = new FormGroup({
    lastName: new FormControl('', {
      validators: [Validators.required],
    }),
    firstName: new FormControl('', {
      validators: [Validators.required],
    }),
    dob: new FormControl('', {
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      validators: [Validators.required],
    }),
    phoneNum: new FormControl('', {
      validators: [Validators.required],
    }),
    social: new FormControl('', {
      validators: [Validators.required],
    }),
    educationInst: new FormControl('', {
      validators: [Validators.required],
    }),
    fieldOfStudy: new FormControl('', {
      validators: [Validators.required],
    }),
    question1: new FormControl('', {
      validators: [Validators.required],
    }),
    question2: new FormControl('', {
      validators: [Validators.required],
    }),
    question3: new FormControl('', {
      validators: [Validators.required],
    }),
    question4: new FormControl('', {
      validators: [Validators.required],
    }),
    question5: new FormControl('', {
      validators: [Validators.required],
    }),
    question6: new FormControl('', {
      validators: [Validators.required],
    }),
    departments: new FormControl('', {
      validators: [Validators.required],
    }),
  });
  constructor(private navbarService: NavbarService) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.navbarService.setPageData(this.pageData);
  }

  submitApplication() {}
}
