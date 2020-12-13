import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavbarService } from 'src/app/shared/navbar/navbar.service';
import { PageData } from 'src/models/PageData';
import { JoinusMemberService } from '../joinus-member-service';

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
    lastname: new FormControl('', {
      validators: [Validators.required],
    }),
    firstname: new FormControl('', {
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
    departments: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  message;
  errorMessage;
  isAdding = false;
  cvData;
  cv;

  constructor(
    private navbarService: NavbarService,
    private memberService: JoinusMemberService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.navbarService.setPageData(this.pageData);
  }

  onCvPicked(event: Event) {
    if ((event.target as HTMLInputElement).files[0]) {
      const file = (event.target as HTMLInputElement).files[0];
      this.cvData = file;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.cv = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.cvData = null;
    }
  }

  addMember() {
    if (
      this.executiveMemberForm.value.firstname == '' ||
      this.executiveMemberForm.value.lastname == '' ||
      this.executiveMemberForm.value.dob == '' ||
      this.executiveMemberForm.value.email == '' ||
      this.executiveMemberForm.value.phoneNumber == '' ||
      this.executiveMemberForm.value.educInstitution == '' ||
      this.executiveMemberForm.value.fieldOfStudy == '' ||
      this.executiveMemberForm.value.question1 == '' ||
      this.executiveMemberForm.value.question2 == '' ||
      this.executiveMemberForm.value.question3 == '' ||
      this.executiveMemberForm.value.question4 == '' ||
      this.executiveMemberForm.value.question5 == '' ||
      this.executiveMemberForm.value.question6 == '' ||
      this.executiveMemberForm.value.departments == '' ||
      !this.cvData
    ) {
      return;
    }

    console.log(this.executiveMemberForm);

    this.message = null;
    this.errorMessage = null;
    this.isAdding = true;

    this.memberService
      .addExecutive(this.executiveMemberForm, this.cvData)
      .subscribe(
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
