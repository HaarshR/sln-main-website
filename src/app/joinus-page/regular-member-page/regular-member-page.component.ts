import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from 'src/app/department-page/department.service';
import { NavbarService } from 'src/app/shared/navbar/navbar.service';
import { Department } from 'src/models/Department';
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
  submitted = false;

  regularMemberForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^(5[0-9]{7})$|^([^5][0-9]{6})$'),
    ]),
    social: new FormControl(''),
    educInstitution: new FormControl('', [Validators.required]),
    fieldOfStudy: new FormControl('', [Validators.required]),
    question1: new FormControl('', [Validators.required]),
    question2: new FormControl('', [Validators.required]),
    question3: new FormControl('', [Validators.required]),
    question4: new FormControl('', [Validators.required]),
    question5: new FormControl('', [Validators.required]),
    question6: new FormControl('', [Validators.required]),
    department: new FormControl(''),
  });

  departments: Department[];

  selectedDepartment = [];

  message;
  errorMessage;
  isAdding = false;

  constructor(
    private navbarService: NavbarService,
    private memberService: JoinusMemberService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.navbarService.setPageData(this.pageData);
    this.departmentService.setDepartments();
    this.departmentService.getWebsiteInfoStatusListener().subscribe((next) => {
      this.departments = next.departments;
    });
  }

  addMember() {
    this.submitted = true;
    console.log(this.selectedDepartment);
    console.log(this.regularMemberForm.value.department);
    if (!this.regularMemberForm.valid || this.selectedDepartment.length == 0) {
      return;
    }
    this.message = null;
    this.errorMessage = null;
    this.isAdding = true;
    this.memberService.addRegular(this.regularMemberForm.value).subscribe(
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

  toggleDepartments(event, name) {
    if (event.target.checked) {
      this.selectedDepartment.push(name);
      this.regularMemberForm.value.department = this.selectedDepartment.join(
        ','
      );
    } else {
      this.selectedDepartment.splice(this.selectedDepartment.indexOf(name), 1);
      if (this.selectedDepartment.length == 0) {
        this.regularMemberForm.value.department = '';
      } else {
        this.regularMemberForm.value.department = this.selectedDepartment.join(
          ','
        );
      }
    }
  }
}
