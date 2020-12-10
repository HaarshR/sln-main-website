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

  joinPageMessage;
  joinPageMessageError;
  joinPagePicData;
  joinPagePic;

  aboutUsMessage;
  aboutUsMessageError;
  aboutPicData;
  aboutPic;

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
  climatePicData;
  climatePic;
  joinUsPicData = [];
  joinUsPic = [];
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
        let temp = next.websiteInfo.landingPage.joinParaImages;
        temp.forEach((image) => {
          if (image == 'landingPage-climate.png') {
            this.climatePic = this.imgUrl + 'landingPage-climate.png';
          } else if (image == 'landingPage-climate.jpg') {
            this.climatePic = this.imgUrl + 'landingPage-climate.jpg';
          } else {
            this.joinUsPic.push({ image: this.imgUrl + image, data: null });
          }
        });
        this.aboutPic = this.imgUrl + next.websiteInfo.aboutUsPage.image;
        this.joinPagePic = this.imgUrl + next.websiteInfo.joinUsPage.image;
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onClimateImagePicked(event: Event, page: string) {
    if ((event.target as HTMLInputElement).files[0]) {
      const file = (event.target as HTMLInputElement).files[0];
      if (page == 'home') {
        this.climatePicData = file;
      } else if (page == 'about') {
        this.aboutPicData = file;
      } else if (page === 'join') {
        this.joinPagePicData = file;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        if (page == 'home') {
          this.climatePic = reader.result;
        } else if (page == 'about') {
          this.aboutPic = reader.result;
        } else if (page === 'join') {
          this.joinPagePic = reader.result;
        }
      };
      reader.readAsDataURL(file);
    } else {
      if (page == 'home') {
        this.climatePicData = null;
      } else if (page == 'about') {
        this.aboutPicData = null;
      } else if (page == 'join') {
        this.joinPagePicData = null;
      }
    }
  }

  onImagesPicked(event: Event) {
    let imagesData = [];
    Array.prototype.forEach.call(
      (event.target as HTMLInputElement).files,
      (file) => {
        this.joinUsPicData.push(file);
        const reader = new FileReader();
        reader.onload = () => {
          this.joinUsPic.push({ image: reader.result, data: file });
        };
        reader.readAsDataURL(file);
      }
    );
  }

  deletePic(obj: any) {
    console.log(obj.image.substring(0, 4));
    if (obj.image.substring(0, 4) == 'data') {
      this.joinUsPic.splice(this.joinUsPic.indexOf(obj), 1);
      this.joinUsPicData.splice(this.joinUsPicData.indexOf(obj.data), 1);
    } else {
      this.joinUsPic.splice(this.joinUsPic.indexOf(obj), 1);
      this.deletePicArray.push(
        obj.image.split('/')[obj.image.split('/').length - 1]
      );
    }
  }

  saveDepartmentPage() {
    if (
      this.departmentForm.value.details ==
      this.websiteInfo.departmentPage.details
    ) {
      return;
    }
    this.websiteInfoService
      .updateDepartmentPage(
        this.websiteInfo._id,
        this.departmentForm.value.details
      )
      .subscribe(
        (next) => {
          this.departmentMessageError = null;
          this.departmentMessage = 'Successfully Edited!';
          this.websiteInfo.departmentPage.details = this.departmentForm.value.details;
          setTimeout(() => {
            this.departmentMessage = null;
          }, 6000);
        },
        (error) => {
          if (error.status == 404) {
            this.departmentMessage = null;
            this.departmentMessageError = 'Failed to update, Not Found!';
          } else {
            this.departmentMessage = null;
            this.departmentMessageError = 'An unknown error occured!';
          }
          setTimeout(() => {
            this.departmentMessageError = null;
          }, 6000);
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
      !this.climatePicData &&
      this.joinUsPicData.length == 0 &&
      this.deletePicArray.length == 0
    ) {
      return;
    }
    const newLandingForm = new FormData();
    newLandingForm.append('detail', this.landingForm.value.detail);
    newLandingForm.append('helpPara', this.landingForm.value.helpPara);
    newLandingForm.append('joinPara', this.landingForm.value.joinPara);

    let indexes = [];
    if (this.joinUsPic.length != 0) {
      this.joinUsPic.forEach((obj) => {
        if (!obj.data) {
          newLandingForm.append(
            'oldImages',
            obj.image.split('/')[obj.image.split('/').length - 1]
          );
          indexes.push(
            obj.image
              .split('/')
              [obj.image.split('/').length - 1].split('_')[1]
              .split('.')[0]
          );
        }
      });
    }

    if (this.deletePicArray.length != 0) {
      this.deletePicArray.forEach((pic) => {
        newLandingForm.append('deletePicArray', pic);
      });
    }

    if (this.climatePicData) {
      newLandingForm.append(
        'images',
        this.climatePicData,
        'landingPage-climate'
      );
    } else {
      if (
        this.websiteInfo.landingPage.joinParaImages.indexOf(
          'landingPage-climate.png'
        ) != -1
      ) {
        newLandingForm.append('oldImages', 'landingPage-climate.png');
      } else {
        newLandingForm.append('oldImages', 'landingPage-climate.jpg');
      }
    }

    if (this.joinUsPicData.length != 0) {
      let i = 1;

      this.joinUsPicData.forEach((data) => {
        let added = false;
        console.log(indexes);
        while (!added) {
          console.log(i.toString(), indexes.indexOf(i.toString()));
          if (indexes.indexOf(i.toString()) == -1) {
            newLandingForm.append('images', data, 'landingPage-slider_' + i);
            i++;
            added = true;
          } else {
            i++;
          }
        }
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
          }, 6000);
        },
        (error) => {
          if (error.status == 404) {
            this.landingMessage = null;
            this.landingMessageError = 'Failed to update, Not Found!';
          } else {
            this.landingMessage = null;
            this.landingMessageError = 'An unknown error occured!';
          }
          setTimeout(() => {
            this.landingMessageError = null;
          }, 6000);
        }
      );
  }

  saveJoinUsPage() {
    if (!this.joinPagePicData) {
      return;
    }
    const newJoinUsForm = new FormData();
    if (this.joinPagePicData) {
      newJoinUsForm.append('image', this.joinPagePicData, 'joinUsPage');
    } else {
      newJoinUsForm.append('image', null);
    }

    newJoinUsForm.append('oldImage', this.websiteInfo.joinUsPage.image);

    this.websiteInfoService
      .updateJoinUsPage(this.websiteInfo._id, newJoinUsForm)
      .subscribe(
        (next) => {
          this.joinPageMessageError = null;
          this.joinPageMessage = 'Successfully Edited!';
          setTimeout(() => {
            this.joinPageMessage = null;
          }, 6000);
        },
        (error) => {
          if (error.status == 404) {
            this.joinPageMessage = null;
            this.joinPageMessageError = 'Failed to update, Not Found!';
          } else {
            this.aboutUsMessage = null;
            this.joinPageMessageError = 'An unknown error occured!';
          }
          setTimeout(() => {
            this.joinPageMessageError = null;
          }, 6000);
        }
      );
  }

  saveAboutUsPage() {
    if (
      this.aboutUsForm.value.details == this.websiteInfo.aboutUsPage.details &&
      this.aboutUsForm.value.mission == this.websiteInfo.aboutUsPage.mission &&
      this.aboutUsForm.value.galleryDetail ==
        this.websiteInfo.aboutUsPage.galleryDetail &&
      !this.aboutPicData
    ) {
      return;
    }
    const newAboutUsForm = new FormData();
    newAboutUsForm.append('details', this.aboutUsForm.value.details);
    newAboutUsForm.append('mission', this.aboutUsForm.value.mission);
    newAboutUsForm.append(
      'galleryDetail',
      this.aboutUsForm.value.galleryDetail
    );

    if (this.aboutPicData) {
      newAboutUsForm.append('image', this.aboutPicData, 'aboutUs');
    } else {
      newAboutUsForm.append('image', null);
    }

    newAboutUsForm.append('oldImage', this.websiteInfo.aboutUsPage.image);

    this.websiteInfoService
      .updateAboutUs(this.websiteInfo._id, newAboutUsForm)
      .subscribe(
        (next) => {
          this.aboutUsMessageError = null;
          this.aboutUsMessage = 'Successfully Edited!';
          this.websiteInfo.aboutUsPage.details = this.aboutUsForm.value.details;
          this.websiteInfo.aboutUsPage.mission = this.aboutUsForm.value.mission;
          this.websiteInfo.aboutUsPage.galleryDetail = this.aboutUsForm.value.galleryDetail;
          setTimeout(() => {
            this.aboutUsMessage = null;
          }, 6000);
        },
        (error) => {
          if (error.status == 404) {
            this.aboutUsMessage = null;
            this.aboutUsMessageError = 'Failed to update, Not Found!';
          } else {
            this.aboutUsMessage = null;
            this.aboutUsMessageError = 'An unknown error occured!';
          }
          setTimeout(() => {
            this.aboutUsMessageError = null;
          }, 6000);
        }
      );
  }
}
