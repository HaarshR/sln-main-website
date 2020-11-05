import { Component, OnInit } from '@angular/core';
import { WebsiteInfoService } from './admin-website-info-service';
import {
  ToolbarService,
  LinkService,
  HtmlEditorService,
} from '@syncfusion/ej2-angular-richtexteditor';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { WebsiteInfo } from 'src/models/WebsiteInfo/WebsiteInfo';

@Component({
  selector: 'app-admin-website-info',
  templateUrl: './admin-website-info.component.html',
  styleUrls: ['./admin-website-info.component.scss'],
  providers: [ToolbarService, LinkService, HtmlEditorService],
})
export class AdminWebsiteInfoComponent implements OnInit {
  rteTools: object = {
    type: 'MultiRow',
    items: [
      'Undo',
      'Redo',
      '|',
      'Bold',
      'Italic',
      'Underline',
      'StrikeThrough',
      '|',
      'FontName',
      'FontSize',
      'FontColor',
      'BackgroundColor',
      '|',
      'Formats',
      'Alignments',
      '|',
      'OrderedList',
      'UnorderedList',
      '|',
      'Indent',
      'Outdent',
      '|',
      'CreateLink',
      'ClearFormat',
      'SourceCode',
    ],
  };

  departmentForm = new FormGroup({
    detail: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  departmentMessage;
  departmentMessageError;
  isEditedDepartment = false;

  aboutUsMessage;
  aboutUsMessageError;
  isEditedAboutUs = false;

  aboutUsForm = new FormGroup({
    details: new FormControl('', {
      validators: [Validators.required],
    }),
    mission: new FormControl('', {
      validators: [Validators.required],
    }),
    galleryDetail: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  isLoading = true;

  websiteInfo: WebsiteInfo;

  constructor(private websiteInfoService: WebsiteInfoService) {}

  ngOnInit(): void {
    this.websiteInfoService.getWebsiteInfo().subscribe(
      (next) => {
        console.log(next.websiteInfo);
        this.websiteInfo = next.websiteInfo;
        this.departmentForm.setValue({
          detail: next.websiteInfo.departmentPage.details,
        });
        this.aboutUsForm.setValue({
          details: next.websiteInfo.aboutUsPage.details,
          mission: next.websiteInfo.aboutUsPage.mission,
          galleryDetail: next.websiteInfo.aboutUsPage.galleryDetail,
        });
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  saveDepartmentPage() {
    if (
      this.departmentForm.value.detail ==
      this.websiteInfo.departmentPage.details
    ) {
      return;
    }
    this.isEditedDepartment = true;
    this.departmentForm.controls['detail'].disable();
    this.websiteInfoService
      .updateDepartmentPage(
        this.websiteInfo._id,
        this.departmentForm.value.detail
      )
      .subscribe(
        (next) => {
          this.departmentMessageError = null;
          this.departmentMessage = 'Successfully Edited!';

          setTimeout(() => {
            this.departmentMessage = null;
          }, 3000);
          this.websiteInfo.departmentPage.details = this.departmentForm.value.detail;
        },
        (error) => {
          if (error.status == 404) {
            this.departmentMessage = null;
            this.departmentMessageError = 'Failed to update, Not Found!';
          } else {
            this.departmentMessage = null;
            this.departmentMessageError = 'An unknown error occured!';
          }
        }
      );
  }

  saveLandingPage() {
    if (
      this.departmentForm.value.detail ==
      this.websiteInfo.departmentPage.details
    ) {
      return;
    }
    this.isEditedDepartment = true;
    this.departmentForm.controls['detail'].disable();
    this.websiteInfoService
      .updateDepartmentPage(
        this.websiteInfo._id,
        this.departmentForm.value.detail
      )
      .subscribe(
        (next) => {
          this.departmentMessageError = null;
          this.departmentMessage = 'Successfully Edited!';

          setTimeout(() => {
            this.departmentMessage = null;
          }, 3000);
          this.websiteInfo.departmentPage.details = this.departmentForm.value.detail;
        },
        (error) => {
          if (error.status == 404) {
            this.departmentMessage = null;
            this.departmentMessageError = 'Failed to update, Not Found!';
          } else {
            this.departmentMessage = null;
            this.departmentMessageError = 'An unknown error occured!';
          }
        }
      );
  }

  saveAboutUsPage() {
    if (
      this.aboutUsForm.value.details == this.websiteInfo.aboutUsPage.details &&
      this.aboutUsForm.value.mission == this.websiteInfo.aboutUsPage.mission &&
      this.aboutUsForm.value.galleryDetail ==
        this.websiteInfo.aboutUsPage.galleryDetail
    ) {
      return;
    }
    this.isEditedAboutUs = true;
    this.aboutUsForm.controls['details'].disable();
    this.aboutUsForm.controls['mission'].disable();
    this.aboutUsForm.controls['galleryDetail'].disable();
    this.websiteInfoService
      .updateAboutUs(this.websiteInfo._id, {
        details: this.aboutUsForm.value.details,
        mission: this.aboutUsForm.value.mission,
        galleryDetail: this.aboutUsForm.value.galleryDetail,
      })
      .subscribe(
        (next) => {
          this.aboutUsMessageError = null;
          this.aboutUsMessage = 'Successfully Edited!';
          setTimeout(() => {
            this.aboutUsMessage = null;
          }, 3000);
          this.websiteInfo.aboutUsPage.details = this.aboutUsForm.value.details;
          this.websiteInfo.aboutUsPage.mission = this.aboutUsForm.value.mission;
          this.websiteInfo.aboutUsPage.galleryDetail = this.aboutUsForm.value.galleryDetail;
        },
        (error) => {
          if (error.status == 404) {
            this.aboutUsMessage = null;
            this.aboutUsMessageError = 'Failed to update, Not Found!';
          } else {
            this.aboutUsMessage = null;
            this.aboutUsMessageError = 'An unknown error occured!';
          }
        }
      );
  }
}
