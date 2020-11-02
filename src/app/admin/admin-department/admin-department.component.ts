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
import { DepartmentService } from './department.service';

const IMAGE_URL = environment.fileUrl;

@Component({
  selector: 'app-admin-department',
  templateUrl: './admin-department.component.html',
  styleUrls: ['./admin-department.component.scss'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService],
})
export class AdminDepartmentComponent implements OnInit {
  imgUrl = IMAGE_URL + 'department/';

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
  maxLength: number = 500;

  isLoading = true;
  addEditMessage = '';
  fetchErrorMessage = '';
  isAdding = false;
  isAdded = false;
  isEditing = false;
  isEdited = false;
  isDeleting = false;
  isDeleted = false;
  errorMessage = '';

  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  faEdit = faEdit;

  images = [];
  imagesPreview = [];

  sortingWay = 'desc';
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

  imagesPreview2 = [];
  imageChangePreview = [];
  imageChange = [];
  imageDelete = [];
  thumbnailData;
  thumbnailPreview;
  thumbnailPreviewNew;

  constructor(
    private modalService: NgbModal,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.departmentService.getDepartments().subscribe({
      next: (result) => {
        result.departments.forEach((department) => {
          this.departments.push(department);
        });
        this.isLoading = false;
        console.log('NEXT');
      },
      error: (error) => {
        console.log('ERROR');
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
      .open(content, { scrollable: true, size: 'lg' })
      .result.then(
        (result) => {
          // this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
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
    this.isEditing = true;
    this.department.images.forEach((image) => {
      if (
        image.indexOf(
          (
            'dpt' +
            this.department.title.replace('_', ' ') +
            '_thumbnail'
          ).toLowerCase()
        ) != -1
      ) {
        this.thumbnailPreview = image;
      } else {
        this.imagesPreview2.push(image);
      }
    });
    this.modalService.dismissAll();
  }

  cancel() {
    this.modalService.dismissAll();
    this.images = [];
    this.imagesPreview = [];
    this.isAdding = false;
    this.isAdded = false;
    this.fetchErrorMessage = '';
    this.addEditMessage = '';
    this.isEditing = false;
    this.isEdited = false;
    this.departmentForm.setValue({
      title: '',
      about: '',
      primary: '#000',
      secondary: '#000',
      tertiary: '#000',
    });
    this.department = null;
    this.isDeleting = false;
    this.isDeleted = false;
    this.errorMessage = '';
    this.thumbnailData = null;
    this.thumbnailPreview = null;
    this.thumbnailPreviewNew = null;
  }

  onImagePicked(event: Event) {
    console.log('sdjncs');
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

  imageType(type: string) {
    const imgType = {
      'image/png': 'png',
      'image/jpeg': 'jpg',
      'image/jpg': 'jpg',
    };
    return imgType[type];
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
      console.log(
        this.departmentForm.value,
        this.departmentForm.invalid,
        this.imagesPreview
      );
      return;
    }
    const newDepartmentForm = new FormData();
    newDepartmentForm.append('title', this.departmentForm.value.title);
    newDepartmentForm.append('about', this.departmentForm.value.about);
    newDepartmentForm.append('primary', this.departmentForm.value.primary);
    newDepartmentForm.append('secondary', this.departmentForm.value.secondary);
    newDepartmentForm.append('tertiary', this.departmentForm.value.tertiary);
    newDepartmentForm.append(
      'images',
      this.thumbnailData,
      'dpt' + this.departmentForm.value.title.replace('_', ' ') + '_thumbnail'
    );
    let i = 1;
    this.images.forEach((data) => {
      newDepartmentForm.append(
        'images',
        data,
        'dpt' + this.departmentForm.value.title.replace('_', ' ') + '_' + i
      );
      i++;
    });
    if (this.images.length == 0) {
      newDepartmentForm.append('images', '', '');
    }
    console.log(this.images);
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
      },
      (error) => {
        if (error.status == 404) {
          this.addEditMessage = 'Error occured! This department already exist.';
        } else {
          this.addEditMessage = 'An unknown error occured!';
        }
        this.isAdded = true;
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
      console.log(this.departmentForm.value);
      return;
    }
    const newDepartmentForm = new FormData();
    newDepartmentForm.append('title', this.departmentForm.value.title);
    newDepartmentForm.append('about', this.departmentForm.value.about);
    newDepartmentForm.append('primary', this.departmentForm.value.primary);
    newDepartmentForm.append('secondary', this.departmentForm.value.secondary);
    newDepartmentForm.append('tertiary', this.departmentForm.value.tertiary);
    if (this.thumbnailPreviewNew) {
      newDepartmentForm.append(
        'images',
        this.thumbnailData,
        'dpt' + this.departmentForm.value.title.replace('_', ' ') + '_thumbnail'
      );
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
          `dpt${this.department.title.replace(' ', '-')}_${imageDatas[1] + 1}`
        );
      });
    }
    let i = this.department.images.length + 1;
    this.images.forEach((image) => {
      newDepartmentForm.append(
        'images',
        image,
        `dpt${this.department.title.replace(' ', '-')}_${i}`
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
          window.location.reload;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  deleteDepartment(department: Department) {
    if (this.deleteForm.invalid) {
      return;
    } else if (this.deleteForm.value.password != 'YES! I am absolutely sure.') {
      return;
    }
    this.departmentService.deleteDepartment(department._id).subscribe(
      (next) => {
        this.departments.splice(this.departments.indexOf(department), 1);
        this.isDeleted = true;
        this.cancel();
      },
      (error) => {
        this.isDeleted = true;
        console.log(error);
        this.errorMessage = error;
        this.modalService.dismissAll();
      }
    );
  }
}
