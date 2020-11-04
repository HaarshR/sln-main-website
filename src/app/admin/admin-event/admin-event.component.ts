import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  faAngleDown,
  faAngleUp,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import {
  NgbModal,
  NgbTimepickerConfig,
  NgbTimeStruct,
} from '@ng-bootstrap/ng-bootstrap';
import {
  ToolbarService,
  LinkService,
  ImageService,
  HtmlEditorService,
} from '@syncfusion/ej2-angular-richtexteditor';

import { environment } from '../../../environments/environment';

import { EventModel } from '../../../models/EventModel';
import { EventService } from './admin-event.service';

const IMAGE_URL = environment.fileUrl;

@Component({
  selector: 'app-admin-event',
  templateUrl: './admin-event.component.html',
  styleUrls: ['./admin-event.component.scss'],
  providers: [
    ToolbarService,
    LinkService,
    ImageService,
    HtmlEditorService,
    NgbTimepickerConfig,
  ],
})
export class AdminEventComponent implements OnInit {
  imgUrl = IMAGE_URL + 'event/';

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

  image;
  imagePreview;
  imagePreviewNew;

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
  propertyName = 'date';

  events: EventModel[] = [];
  event: EventModel;

  minDate;
  time: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };

  eventForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
    }),
    description: new FormControl('', {
      validators: [Validators.required],
    }),
    departmentName: new FormControl('', {
      validators: [Validators.required],
    }),
    date: new FormControl('', {
      validators: [Validators.required],
    }),
    time: new FormControl('', {
      validators: [Validators.required],
    }),
    location: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  deleteForm = new FormGroup({
    password: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  constructor(
    private modalService: NgbModal,
    private eventService: EventService,
    config: NgbTimepickerConfig
  ) {
    config.seconds = false;
    config.spinners = false;
  }

  ngOnInit(): void {
    this.minDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDate(),
    };
    this.eventService.getEvents().subscribe({
      next: (result) => {
        result.events.forEach((event) => {
          this.events.push(event);
        });
        this.isLoading = false;
      },
      error: (error) => {
        if (error.status == 404) {
          this.fetchErrorMessage = 'No events found!';
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

  // edit(event: Event) {
  //   this.eventForm.setValue({
  //     name: event.name,
  //     description: event.description,
  //     departmentName: event.departmentName,
  //     date: event.date,
  //     location: event.location,
  //   });
  //   this.event = event;
  //   this.imagePreview = this.event.logo;
  //   this.isEditing = true;
  // }

  cancel() {
    this.isLoading2 = false;
    this.isAdding = false;
    this.isAdded = false;
    this.fetchErrorMessage = '';
    this.addEditMessage = '';
    this.isEditing = false;
    this.isEdited = false;
    this.eventForm.setValue({
      name: '',
      description: '',
      departmentName: '',
      date: '',
      time: '',
      location: '',
    });
    this.deleteForm.setValue({
      password: '',
    });
    this.event = null;
    this.isDeleting = false;
    this.isDeleted = false;
    this.errorMessage = '';
    this.image = null;
    this.imagePreview = null;
    this.imagePreviewNew = null;
  }

  onImagePicked(event: Event) {
    if ((event.target as HTMLInputElement).files[0]) {
      const file = (event.target as HTMLInputElement).files[0];
      this.image = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreviewNew = reader.result;
        if (this.imagePreviewNew) {
          this.imagePreview = null;
        }
      };
      reader.readAsDataURL(file);
    } else {
      this.image = null;
      this.imagePreviewNew = null;
    }
  }

  add() {
    if (
      !this.eventForm.value.name ||
      !this.eventForm.value.description ||
      !this.eventForm.value.departmentName ||
      !this.eventForm.value.date ||
      !this.eventForm.value.time ||
      !this.eventForm.value.location ||
      !this.imagePreviewNew
    ) {
      console.log(this.eventForm.value);
      return;
    }
    this.isLoading2 = true;
    const newEventForm = new FormData();
    newEventForm.append('name', this.eventForm.value.name);
    newEventForm.append('description', this.eventForm.value.description);
    newEventForm.append('departmentName', this.eventForm.value.departmentName);
    newEventForm.append(
      'date',
      new Date(
        this.eventForm.value.date.year,
        this.eventForm.value.date.month,
        this.eventForm.value.date.day,
        this.eventForm.value.time.hour,
        this.eventForm.value.time.minute,
        this.eventForm.value.time.second
      ).toISOString()
    );
    newEventForm.append('location', this.eventForm.value.location);
    newEventForm.append(
      'logo',
      this.image,
      'event' + this.eventForm.value.name + '_LOGO'
    );
    this.eventService.addEvent(newEventForm).subscribe(
      (next) => {
        console.log(next);
        if (next.message) {
          this.addEditMessage = 'Event was successfully added!';
        } else {
          this.addEditMessage =
            'Event was successfully added BUT with some errors! The logo might have not been uploaded...';
        }
        let obj = {
          _id: next.id,
          logo: next.logo,
          name: this.eventForm.value.name,
          description: this.eventForm.value.description,
          departmentName: this.eventForm.value.departmentName,
          date: this.eventForm.value.date,
          location: this.eventForm.value.location,
          images: [],
        };
        this.events.push(obj);
        this.isAdded = true;
        this.isLoading2 = false;
      },
      (error) => {
        console.log(error);
        if (error.status == 404) {
          this.addEditMessage = 'Error occured! This event already exist.';
        } else {
          this.addEditMessage = 'An unknown error occured!';
        }
        this.isAdded = true;
        this.isLoading2 = false;
      }
    );
  }

  // save() {
  //   if (
  //     !this.blogForm.value.name ||
  //     !this.blogForm.value.title ||
  //     !this.blogForm.value.detail ||
  //     (!this.imagePreview && !this.imagePreviewNew)
  //   ) {
  //     return;
  //   }
  //   this.isLoading2 = true;
  //   const newBlogForm = new FormData();
  //   if (this.imagePreviewNew) {
  //     newBlogForm.append(
  //       'image',
  //       this.image,
  //       'blg' + this.blogForm.value.title
  //     );
  //   } else {
  //     newBlogForm.append('image', null);
  //   }
  //   newBlogForm.append('name', this.blogForm.value.name);
  //   newBlogForm.append('oldFileName', this.blog.image);
  //   newBlogForm.append('title', this.blogForm.value.title);
  //   newBlogForm.append('detail', this.blogForm.value.detail);
  //   this.blogService.updateBlog(newBlogForm, this.blog._id).subscribe(
  //     (next) => {
  //       this.isEdited = true;
  //       window.location.reload();
  //     },
  //     (error) => {
  //       if (error.status == 404) {
  //         this.addEditMessage = 'Error occured! Update failed.';
  //       } else {
  //         this.addEditMessage = 'An unknown error occured!';
  //       }
  //       this.isEdited = true;
  //       this.isLoading2 = false;
  //     }
  //   );
  // }

  deleteEvent(event: EventModel) {
    if (this.deleteForm.invalid) {
      return;
    } else if (this.deleteForm.value.password != 'YES! I am absolutely sure.') {
      return;
    }
    this.isDeleting = false;
    this.isLoading2 = true;
    this.eventService.deleteEvent(event._id, event.name, event.logo).subscribe(
      (next) => {
        this.events.splice(this.events.indexOf(event), 1);
        this.isDeleted = true;
        this.errorMessage = 'Event deleted successfully!';
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
