import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavbarService } from 'src/app/shared/navbar/navbar.service';
import { PageData } from 'src/models/PageData';
import { JoinusMemberService } from '../joinus-member-service';

@Component({
  selector: 'app-regular-member-page',
  templateUrl: './regular-member-page.component.html',
  styleUrls: ['./regular-member-page.component.scss'],
})
export class RegularMemberPageComponent implements OnInit {
  private pageData: PageData = {
    navBackground: '#ffffff',
    navLink: '#000000',
    specialNavLink: '#546c55',
    togglerColor: '#546c55',
    visible: true,
  };

  regularMemberForm = new FormGroup({
    firstname: new FormControl('', {
      validators: [Validators.required],
    }),
    lastname: new FormControl('', {
      validators: [Validators.required],
    }),
    dob: new FormControl('', {
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      validators: [Validators.required],
    }),
    phoneNumber: new FormControl('', {
      validators: [Validators.required],
    }),
    social: new FormControl('', {
      validators: [Validators.required],
    }),
    educInstitution: new FormControl('', {
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
    department: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  message;
  errorMessage;
  isAdding = false;

  constructor(
    private navbarService: NavbarService,
    private memberService: JoinusMemberService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.navbarService.setPageData(this.pageData);
  }

  addMember() {
    if (
      this.regularMemberForm.value.firstname == '' ||
      this.regularMemberForm.value.lastname == '' ||
      this.regularMemberForm.value.dob == '' ||
      this.regularMemberForm.value.email == '' ||
      this.regularMemberForm.value.phoneNumber == '' ||
      this.regularMemberForm.value.educInstitution == '' ||
      this.regularMemberForm.value.fieldOfStudy == '' ||
      this.regularMemberForm.value.question1 == '' ||
      this.regularMemberForm.value.question2 == '' ||
      this.regularMemberForm.value.question3 == '' ||
      this.regularMemberForm.value.question4 == '' ||
      this.regularMemberForm.value.question5 == '' ||
      this.regularMemberForm.value.question6 == '' ||
      this.regularMemberForm.value.department == ''
    ) {
      return;
    }

    this.message = null;
    this.errorMessage = null;
    this.isAdding = true;
    this.memberService.add(this.regularMemberForm.value).subscribe(
      (next) => {
        this.message = next.message;
        this.isAdding = false;
      },
      (error) => {
        this.errorMessage = error.error.errorMessage;
        this.isAdding = false;
      }
    );
  }
}
