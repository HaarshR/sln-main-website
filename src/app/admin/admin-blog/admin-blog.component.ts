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

import { BlogService } from './admin-blog.service';
import { Blog } from 'src/models/Blogs/Blog';

const IMAGE_URL = environment.fileUrl;

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService],
})
export class AdminBlogComponent implements OnInit {
  imgUrl = IMAGE_URL + 'blog/';

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
  propertyName = 'dor';

  blogs: Blog[] = [];
  blog: Blog;

  blogForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
    }),
    title: new FormControl('', {
      validators: [Validators.required],
    }),
    detail: new FormControl('', {
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
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe({
      next: (result) => {
        result.blogs.forEach((blog) => {
          this.blogs.push(blog);
        });
        this.isLoading = false;
      },
      error: (error) => {
        if (error.status == 404) {
          this.fetchErrorMessage = 'No blogs found!';
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

  edit(blog: Blog) {
    this.blogForm.setValue({
      name: blog.name,
      title: blog.title,
      detail: blog.detail,
    });
    this.blog = blog;
    this.imagePreview = this.blog.image;
    this.isEditing = true;
  }

  cancel() {
    this.isLoading2 = false;
    this.isAdding = false;
    this.isAdded = false;
    this.fetchErrorMessage = '';
    this.addEditMessage = '';
    this.isEditing = false;
    this.isEdited = false;
    this.blogForm.setValue({
      name: '',
      title: '',
      detail: '',
    });
    this.deleteForm.setValue({
      password: '',
    });
    this.blog = null;
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
      !this.blogForm.value.name ||
      !this.blogForm.value.title ||
      !this.blogForm.value.detail ||
      !this.imagePreviewNew
    ) {
      return;
    }
    this.isLoading2 = true;
    const newBlogForm = new FormData();
    newBlogForm.append('name', this.blogForm.value.name);
    newBlogForm.append('title', this.blogForm.value.title);
    newBlogForm.append('detail', this.blogForm.value.detail);
    newBlogForm.append('image', this.image, 'blg' + this.blogForm.value.title);
    this.blogService.addBlog(newBlogForm).subscribe(
      (next) => {
        if (next.message) {
          this.addEditMessage = 'Blog was successfully added!';
        } else {
          this.addEditMessage =
            'Blog was successfully added BUT with some errors! The profile picture might have not been uploaded...';
        }
        let obj = {
          _id: next.id,
          date: new Date(),
          image: next.image,
          name: this.blogForm.value.name,
          title: this.blogForm.value.title,
          detail: this.blogForm.value.detail,
          viewCount: this.blogForm.value.detail,
          comments: [],
        };
        this.blogs.push(obj);
        this.isAdded = true;
        this.isLoading2 = false;
      },
      (error) => {
        console.log(error);
        if (error.status == 404) {
          this.addEditMessage = 'Error occured! This blog title already exist.';
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
      !this.blogForm.value.name ||
      !this.blogForm.value.title ||
      !this.blogForm.value.detail ||
      (!this.imagePreview && !this.imagePreviewNew)
    ) {
      return;
    }
    this.isLoading2 = true;
    const newBlogForm = new FormData();
    if (this.imagePreviewNew) {
      newBlogForm.append(
        'image',
        this.image,
        'blg' + this.blogForm.value.title
      );
    } else {
      newBlogForm.append('image', null);
    }
    newBlogForm.append('name', this.blogForm.value.name);
    newBlogForm.append('oldFileName', this.blog.image);
    newBlogForm.append('title', this.blogForm.value.title);
    newBlogForm.append('detail', this.blogForm.value.detail);
    this.blogService.updateBlog(newBlogForm, this.blog._id).subscribe(
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

  deleteBlog(blog: Blog) {
    if (this.deleteForm.invalid) {
      return;
    } else if (this.deleteForm.value.password != 'YES! I am absolutely sure.') {
      return;
    }
    this.isDeleting = false;
    this.isLoading2 = true;
    this.blogService.deleteBlog(blog._id, blog.image).subscribe(
      (next) => {
        this.blogs.splice(this.blogs.indexOf(blog), 1);
        this.isDeleted = true;
        this.errorMessage = 'Blog deleted successfully!';
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
