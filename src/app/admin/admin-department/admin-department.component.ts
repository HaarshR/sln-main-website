import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  faAngleDown,
  faAngleUp,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  ToolbarService,
  LinkService,
  ImageService,
  HtmlEditorService,
} from '@syncfusion/ej2-angular-richtexteditor';

import { environment } from '../../../environments/environment';

import { Department } from '../../../models/Department';
import { AdminDepartmentService } from './admin-department.service';

const IMAGE_URL = environment.fileUrl;

@Component({
  selector: 'app-admin-department',
  templateUrl: './admin-department.component.html',
  styleUrls: ['./admin-department.component.scss'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService],
})
export class AdminDepartmentComponent implements OnInit {
  imgUrl = IMAGE_URL + 'department/';

  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  faEdit = faEdit;

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
  // maxLength: number = 500;

  isLoading = true;
  isLoading2 = false;
  addEditMessage = '';
  fetchErrorMessage = '';
  isAdding = false;
  isAdded = false;
  isEditing = false;
  isEdited = false;
  isDeleting = false;
  isDeleted = false;
  errorMessage = '';

  sortingWay = 'asc';
  propertyName = 'dateAdded';

  departmentForm = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required],
    }),
    about: new FormControl('', {
      validators: [Validators.required],
    }),
    primary: new FormControl('#000', {
      validators: [Validators.required],
    }),
    secondary: new FormControl('#000', {
      validators: [Validators.required],
    }),
    tertiary: new FormControl('#000', {
      validators: [Validators.required],
    }),
  });

  deleteForm = new FormGroup({
    password: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  departments: Department[] = [];
  department: Department;

  private imageFolder;
  imageFolderPub;

  images = [];
  imagesPreview = [];
  imagesPreview2 = [];
  imageChangePreview = [];
  imageChange = [];
  imageDelete = [];
  thumbnailData;
  thumbnailPreview;
  thumbnailPreviewNew;

  constructor(
    private modalService: NgbModal,
    private departmentService: AdminDepartmentService
  ) {}

  ngOnInit(): void {
    this.departmentService.getDepartments().subscribe({
      next: (result) => {
        result.departments.forEach((department) => {
          this.departments.push(department);
        });
        this.isLoading = false;
      },
      error: (error) => {
        if (error.status == 404) {
          this.fetchErrorMessage = 'No departments found!';
          this.isLoading = false;
        } else {
          this.fetchErrorMessage = 'An unknown error occured!';
          this.isLoading = false;
        }
      },
    });
  }

  openViewModal(content) {
    this.modalService
      .open(content, { scrollable: true, size: 'xl' })
      .result.then();
  }

  sortProperty(propertyName: string) {
    if (this.propertyName != propertyName) {
      this.isLoading = true;
      this.propertyName = propertyName;
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    }
  }

  sortWay(sortingWay: string) {
    this.isLoading = true;
    this.sortingWay = sortingWay;
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  edit(department: Department) {
    this.departmentForm.setValue({
      title: department.title,
      about: department.about,
      primary: department.colors.primary,
      secondary: department.colors.secondary,
      tertiary: department.colors.tertiary,
    });
    this.department = department;
    this.imageFolder = department.imageFolder;
    this.imageFolderPub = department.imageFolder;
    department.images.forEach((image) => {
      if (image.indexOf('_thumbnail') != -1) {
        this.thumbnailPreview = image;
      } else {
        this.imagesPreview2.push(image);
      }
    });
    this.isEditing = true;
  }

  cancel() {
    this.isLoading2 = false;
    this.addEditMessage = '';
    this.fetchErrorMessage = '';
    this.isAdding = false;
    this.isAdded = false;
    this.isEditing = false;
    this.isEdited = false;
    this.isDeleting = false;
    this.isDeleted = false;
    this.errorMessage = '';
    this.images = [];
    this.imagesPreview = [];
    this.departmentForm.setValue({
      title: '',
      about: '',
      primary: '#000',
      secondary: '#000',
      tertiary: '#000',
    });
    this.deleteForm.setValue({
      password: '',
    });
    this.department = null;
    this.imageFolder = null;
    this.imageFolderPub = null;
    this.imagesPreview2 = [];
    this.imageChangePreview = [];
    this.imageChange = [];
    this.imageDelete = [];
    this.thumbnailData = null;
    this.thumbnailPreview = null;
    this.thumbnailPreviewNew = null;
  }

  onImagePicked(event: Event) {
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

  onThumbnailChange(event: Event) {
    if ((event.target as HTMLInputElement).files[0]) {
      const file = (event.target as HTMLInputElement).files[0];
      this.thumbnailData = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.thumbnailPreviewNew = reader.result;
        if (this.thumbnailPreviewNew) {
          this.imageDelete.push(this.thumbnailPreview);
          this.thumbnailPreview = null;
        }
      };
      reader.readAsDataURL(file);
    } else {
      this.thumbnailData = null;
      this.thumbnailPreviewNew = null;
    }
  }

  onImageChange(event: Event, oldImage: string) {
    const index = this.department.images.indexOf(oldImage);
    this.imagesPreview2.splice(this.imagesPreview2.indexOf(oldImage), 1);
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageChangePreview.push(reader.result);
    };
    this.imageChange.push([file, index]);
    reader.readAsDataURL(file);
  }

  deletePic(imageName: string) {
    this.imageDelete.push(imageName);
    this.imagesPreview2.splice(this.imagesPreview2.indexOf(imageName), 1);
  }

  add() {
    if (
      !this.departmentForm.value.title ||
      !this.departmentForm.value.about ||
      !this.departmentForm.value.primary ||
      !this.departmentForm.value.secondary ||
      !this.departmentForm.value.tertiary ||
      this.imagesPreview.length == 0 ||
      !this.thumbnailPreviewNew
    ) {
      return;
    }
    this.isLoading2 = true;
    const newDepartmentForm = new FormData();
    newDepartmentForm.append('title', this.departmentForm.value.title);
    newDepartmentForm.append('about', this.departmentForm.value.about);
    newDepartmentForm.append('primary', this.departmentForm.value.primary);
    newDepartmentForm.append('secondary', this.departmentForm.value.secondary);
    newDepartmentForm.append('tertiary', this.departmentForm.value.tertiary);
    newDepartmentForm.append(
      'images',
      this.thumbnailData,
      'dpt' + this.departmentForm.value.title + '_thumbnail'
    );
    let i = 1;
    this.images.forEach((data) => {
      newDepartmentForm.append(
        'images',
        data,
        'dpt' + this.departmentForm.value.title + '_' + i
      );
      i++;
    });
    if (this.images.length == 0) {
      newDepartmentForm.append('images', '', '');
    }
    this.departmentService.addDepartments(newDepartmentForm).subscribe(
      (next) => {
        if (next.message) {
          this.addEditMessage = 'Department was successfully added!';
        } else {
          this.addEditMessage =
            'Department was successfully added BUT with some errors! Pictures might have not been uploaded...';
        }
        let obj = {
          _id: next.id,
          date: new Date(),
          images: [],
          imageFolder: this.departmentForm.value.title.split(' ').join('-'),
          title: this.departmentForm.value.title,
          about: this.departmentForm.value.about,
          colors: {
            primary: this.departmentForm.value.primary,
            secondary: this.departmentForm.value.secondary,
            tertiary: this.departmentForm.value.tertiary,
          },
        };
        next.images.forEach((image) => {
          obj.images.push(image);
        });
        this.departments.push(obj);
        this.isAdded = true;
        this.isLoading2 = false;
      },
      (error) => {
        if (error.status == 404) {
          this.addEditMessage = 'Error occured! This department already exist.';
        } else {
          this.addEditMessage = 'An unknown error occured!';
        }
        this.isAdded = true;
        this.isLoading2 = false;
      }
    );
  }

  save() {
    if (
      !this.departmentForm.value.title ||
      !this.departmentForm.value.about ||
      !this.departmentForm.value.primary ||
      !this.departmentForm.value.secondary ||
      !this.departmentForm.value.tertiary ||
      (this.imagesPreview.length == 0 && this.imagesPreview2.length == 0) ||
      (!this.thumbnailPreview && !this.thumbnailPreviewNew)
    ) {
      return;
    }
    this.isLoading2 = true;
    const newDepartmentForm = new FormData();
    newDepartmentForm.append('imageFolder', this.imageFolder);
    newDepartmentForm.append('title', this.departmentForm.value.title);
    newDepartmentForm.append('about', this.departmentForm.value.about);
    newDepartmentForm.append('primary', this.departmentForm.value.primary);
    newDepartmentForm.append('secondary', this.departmentForm.value.secondary);
    newDepartmentForm.append('tertiary', this.departmentForm.value.tertiary);
    if (this.thumbnailPreviewNew) {
      newDepartmentForm.append(
        'images',
        this.thumbnailData,
        'dpt' + this.departmentForm.value.title + '_thumbnail'
      );
    } else {
      newDepartmentForm.append('oldImages', this.thumbnailPreview);
    }
    if (this.imagesPreview2.length == 0) {
      newDepartmentForm.append('oldImages', 'null');
      newDepartmentForm.append('oldImages', 'null');
    } else {
      this.imagesPreview2.forEach((image) => {
        newDepartmentForm.append('oldImages', image);
      });
      if (this.imagesPreview2.length == 1) {
        newDepartmentForm.append('oldImages', 'null');
      }
    }
    if (this.imageChange.length == 0) {
      if (this.images.length == 0) {
        newDepartmentForm.append('images', null);
      }
    } else {
      this.imageChange.forEach((imageDatas) => {
        newDepartmentForm.append(
          'images',
          imageDatas[0],
          `dpt${this.department.title}_${imageDatas[1] + 1}`
        );
      });
    }
    let i = this.department.images.length + 1;
    this.images.forEach((image) => {
      newDepartmentForm.append(
        'images',
        image,
        `dpt${this.department.title}_${i}`
      );
      i++;
    });
    this.imageDelete.forEach((imageDelete) => {
      newDepartmentForm.append('imageDelete', imageDelete);
    });
    if (this.imageDelete.length == 1) {
      newDepartmentForm.append('imageDelete', 'null');
    }
    this.departmentService
      .updateDepartment(newDepartmentForm, this.department._id)
      .subscribe(
        (next) => {
          this.isEdited = true;
          window.location.reload();
        },
        (error) => {
          if (error.status == 404) {
            this.addEditMessage = 'Error occured! Update failed.';
          } else {
            this.addEditMessage = 'An unknown error occured!';
          }
          this.isEdited = true;
          this.isLoading2 = false;
        }
      );
  }

  deleteDepartment(department: Department) {
    if (this.deleteForm.invalid) {
      return;
    } else if (this.deleteForm.value.password != 'YES! I am absolutely sure.') {
      return;
    }
    this.isDeleting = false;
    this.isLoading2 = true;
    this.departmentService.deleteDepartment(department._id).subscribe(
      (next) => {
        this.departments.splice(this.departments.indexOf(department), 1);
        this.isDeleted = true;
        this.errorMessage = 'Department deleted successfully!';
        this.isLoading2 = false;
      },
      (error) => {
        this.isDeleted = true;
        if (error.status == 404) {
          this.errorMessage = 'Error occured! Deletion failed.';
        } else {
          this.errorMessage = 'An unknown error occured!';
        }
        this.isLoading2 = false;
      }
    );
  }
}
