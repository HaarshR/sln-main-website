import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  faAngleDown,
  faAngleUp,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import {
  ToolbarService,
  LinkService,
  ImageService,
  HtmlEditorService,
} from '@syncfusion/ej2-angular-richtexteditor';
import { environment } from 'src/environments/environment';
import { Department } from 'src/models/Department';
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

  isLoading = true;
  addEditMessage = '';
  fetchErrorMessage = '';
  isAdding = false;
  isAdded = false;
  isEditing = false;
  isEdited = false;
  isDeleting = false;
  isDeleted = false;

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
  });

  departments: Department[] = [];
  department: Department;

  constructor(private departmentService: DepartmentService) {}

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
    });
    this.department = department;
    this.isEditing = true;
  }

  cancel() {
    this.images = [];
    this.imagesPreview = [];
    this.isAdding = false;
    this.fetchErrorMessage = '';
    this.addEditMessage = '';
    this.isEditing = false;
    this.departmentForm.setValue({
      title: '',
      about: '',
    });
    this.department = null;
    this.isDeleting = false;
    this.isDeleted = false;
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

  imageType(type: string) {
    const imgType = {
      'image/png': 'png',
      'image/jpeg': 'jpg',
      'image/jpg': 'jpg',
    };
    return imgType[type];
  }

  add() {
    if (this.departmentForm.invalid || this.imagesPreview.length == 0) {
      return;
    }
    const newDepartmentForm = new FormData();
    newDepartmentForm.append('title', this.departmentForm.value.title);
    newDepartmentForm.append('about', this.departmentForm.value.about);
    let i = 1;
    this.images.forEach((data) => {
      newDepartmentForm.append(
        'images',
        data,
        this.departmentForm.value.title + '_' + i
      );
      i++;
    });
    console.log(this.images);
    this.departmentService.addDepartments(newDepartmentForm).subscribe(
      (next) => {
        if (next.message) {
          this.addEditMessage = 'Department was successfully added!';
        } else {
          this.addEditMessage =
            'Department was successfully added BUT with some errors! Pictures might have not been uploaded...';
        }
        this.departments.push({
          _id: next.id,
          date: new Date(),
          images: next.images,
          title: this.departmentForm.value.title,
          about: this.departmentForm.value.about,
        });
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
    // if (this.departmentForm.invalid || this.imagesPreview.length == 0) {
    //   return;
    // }
    // const newDepartmentForm = new FormData();
    // newDepartmentForm.append('title', this.departmentForm.value.title);
    // newDepartmentForm.append('about', this.departmentForm.value.about);
    // let i = 1;
    // this.images.forEach((data) => {
    //   newDepartmentForm.append(
    //     'images',
    //     data,
    //     this.departmentForm.value.title + '_' + i
    //   );
    //   i++;
    // });
    // console.log(this.images);
    // this.departmentService.addDepartments(newDepartmentForm).subscribe(
    //   (next) => {
    //     if (next.message) {
    //       this.addEditMessage = 'Department was successfully added!';
    //     } else {
    //       this.addEditMessage =
    //         'Department was successfully added BUT with some errors! Pictures might have not been uploaded...';
    //     }
    //     this.isAdded = true;
    //   },
    //   (error) => {
    //     if (error.status == 404) {
    //       this.addEditMessage = 'Error occured! This department already exist.';
    //     } else {
    //       this.addEditMessage = 'An unknown error occured!';
    //     }
    //     this.isAdded = true;
    //   }
    // );
  }

  deleteDepartment(department: Department) {}
}
