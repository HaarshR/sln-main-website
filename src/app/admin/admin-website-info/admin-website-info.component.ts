import { Component, OnInit } from '@angular/core';
import { WebsiteInfoService } from './admin-website-info-service';
import {
  ToolbarService,
  LinkService,
  HtmlEditorService,
} from '@syncfusion/ej2-angular-richtexteditor';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { WebsiteInfo } from 'src/models/WebsiteInfo/WebsiteInfo';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../environments/environment';

const IMAGE_URL = environment.fileUrl;

@Component({
  selector: 'app-admin-website-info',
  templateUrl: './admin-website-info.component.html',
  styleUrls: ['./admin-website-info.component.scss'],
  providers: [ToolbarService, LinkService, HtmlEditorService],
})
export class AdminWebsiteInfoComponent implements OnInit {
  imgUrl = IMAGE_URL + 'websiteInfo/';

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

  faEdit = faEdit;

  departmentForm = new FormGroup({
    details: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  departmentMessage;
  departmentMessageError;
  isEditedDepartment = false;

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

  aboutUsMessage;
  aboutUsMessageError;
  isEditedAboutUs = false;

  landingForm = new FormGroup({
    detail: new FormControl('', {
      validators: [Validators.required],
    }),
    helpPara: new FormControl('', {
      validators: [Validators.required],
    }),
    joinPara: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  landingMessage;
  landingMessageError;
  isEditedLanding = false;
  image;
  imagePreview;
  images;
  imagesPreview;
  imagesPreview2;
  deletePicArray = [];

  isLoading = true;

  websiteInfo: WebsiteInfo;

  constructor(private websiteInfoService: WebsiteInfoService) {}

  ngOnInit(): void {
    this.websiteInfoService.getWebsiteInfo().subscribe(
      (next) => {
        console.log(next.websiteInfo);
        this.websiteInfo = next.websiteInfo;
        this.departmentForm.setValue({
          details: next.websiteInfo.departmentPage.details,
        });
        this.aboutUsForm.setValue({
          details: next.websiteInfo.aboutUsPage.details,
          mission: next.websiteInfo.aboutUsPage.mission,
          galleryDetail: next.websiteInfo.aboutUsPage.galleryDetail,
        });
        this.landingForm.setValue({
          detail: next.websiteInfo.landingPage.detail,
          helpPara: next.websiteInfo.landingPage.helpPara,
          joinPara: next.websiteInfo.landingPage.joinPara,
        });
        this.imagesPreview2 = next.websiteInfo.landingPage.joinParaImages;
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onClimateImagePicked(event: Event) {
    if ((event.target as HTMLInputElement).files[0]) {
      const file = (event.target as HTMLInputElement).files[0];
      this.image = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.image = null;
      this.imagePreview = null;
    }
  }

  onImagesPicked(event: Event) {
    let imagesPreview = [];
    let imagesData = [];
    Array.prototype.forEach.call(
      (event.target as HTMLInputElement).files,
      (file) => {
        imagesData.push(file);
        const reader = new FileReader();
        reader.onload = () => {
          imagesPreview.push(reader.result);
        };
        reader.readAsDataURL(file);
      }
    );
    this.imagesPreview = imagesPreview;
    this.images = imagesData;
  }

  deletePic(image: string) {
    this.deletePicArray.push(image);
    this.imagesPreview2.splice(this.imagesPreview2.indexOf(image), 1);
  }

  saveDepartmentPage() {
    if (
      this.departmentForm.value.details ==
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
      this.landingForm.value.detail == this.websiteInfo.landingPage.detail &&
      this.landingForm.value.helpPara ==
        this.websiteInfo.landingPage.helpPara &&
      this.landingForm.value.joinPara ==
        this.websiteInfo.landingPage.joinPara &&
      !this.image &&
      !this.images
    ) {
      return;
    }

    this.isEditedLanding = true;
    this.landingForm.controls['detail'].disable();
    this.landingForm.controls['helpPara'].disable();
    this.landingForm.controls['joinPara'].disable();

    const newLandingForm = new FormData();
    newLandingForm.append('detail', this.landingForm.value.detail);
    newLandingForm.append('helpPara', this.landingForm.value.helpPara);
    newLandingForm.append('joinPara', this.landingForm.value.joinPara);

    if (this.imagesPreview2) {
      this.imagesPreview2.forEach((image) => {
        newLandingForm.append('oldImages', image);
      });
    }

    if (this.deletePicArray) {
      this.deletePicArray.forEach((pic) => {
        newLandingForm.append('deletePicArray', pic);
      });
      if (this.deletePicArray.length == 1) {
        newLandingForm.append('deletePicArray', null);
      }
    } else {
      newLandingForm.append('deletePicArray', null);
    }

    if (this.image) {
      newLandingForm.append('images', this.image, 'landingPage-climate');
    }
    if (this.images) {
      let i = 1;
      this.images.forEach((data) => {
        newLandingForm.append('images', data, 'landingPage-slider_' + i);
        i++;
      });
    } else {
      newLandingForm.append('images', null);
    }
    this.websiteInfoService
      .updateLandingPage(this.websiteInfo._id, newLandingForm)
      .subscribe(
        (next) => {
          this.landingMessageError = null;
          this.landingMessage = 'Successfully Edited!';

          setTimeout(() => {
            this.landingMessage = null;
          }, 5000);
        },
        (error) => {
          if (error.status == 404) {
            this.landingMessage = null;
            this.landingMessageError = 'Failed to update, Not Found!';
          } else {
            this.landingMessage = null;
            this.landingMessageError = 'An unknown error occured!';
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
      console.log('dddddddddddcsdc');

      return;
    }
    console.log('djcnsdcsdc');
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
