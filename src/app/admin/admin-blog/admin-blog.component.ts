import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  faAngleDown,
  faAngleUp,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../environments/environment';

import { Blog } from '../../../models/Blogs/Blog';
import { BlogService } from './blog.service';

const IMAGE_URL = environment.fileUrl;
@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss'],
})
export class AdminBlogComponent implements OnInit {
  imgUrl = IMAGE_URL + 'blog/';

  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  faEdit = faEdit;

  image;
  imagePreview;

  isLoading = true;
  isSaving = false;
  isSaved = false;
  error = false;
  errorMessage = '';

  sortingWay = 'desc';
  propertyName = 'date';

  editingBlog = false;

  blogs: Blog[] = [];

  blogForm = new FormGroup({
    image: new FormControl('', {
      validators: [Validators.required],
    }),
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

  constructor(private blogService: BlogService) {}

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
          this.errorMessage = 'No departments found!';
          this.isLoading = false;
        } else {
          this.errorMessage = 'An unknown error occured!';
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

  edit(blog: Blog) {
    this.blogForm.setValue({
      image: blog.image,
      name: blog.name,
      title: blog.title,
      detail: blog.detail,
    });
    this.editingBlog = true;
  }

  cancel() {
    this.blogForm.setValue({
      image: '',
      name: '',
      title: '',
      detail: '',
    });
    this.editingBlog = false;
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.image = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  imageType(type: string) {
    const imgType = {
      'image/png': 'png',
      'image/jpeg': 'jpg',
      'image/jpg': 'jpg',
    };
    return imgType[type];
  }

  save(blog: Blog) {
    if (this.blogForm.invalid) {
      return;
    }
    this.isSaving = true;
    const newBlogForm = new FormData();
    if (this.imagePreview) {
      newBlogForm.append('image', this.image, blog._id);
    } else {
      newBlogForm.append('image', '');
    }

    newBlogForm.append('name', this.blogForm.value.name);
    newBlogForm.append('oldFileName', this.blogForm.value.image);
    newBlogForm.append('title', this.blogForm.value.title);
    newBlogForm.append('detail', this.blogForm.value.detail);
    console.log(
      (this.blogs[this.blogs.indexOf(blog)].image =
        this.blogForm.value.name.toLowerCase() +
        '.' +
        this.imageType(this.image.type))
    );
    this.blogService.updateBlog(newBlogForm, blog._id).subscribe(
      (next) => {
        if (newBlogForm.get('image') != '') {
          this.blogs[this.blogs.indexOf(blog)].image =
            this.blogForm.value.name.toLowerCase() +
            '.' +
            this.imageType(this.image.type);
        }

        this.blogs[this.blogs.indexOf(blog)].name = this.blogForm.value.name;
        this.blogs[this.blogs.indexOf(blog)].title = this.blogForm.value.title;
        this.blogs[
          this.blogs.indexOf(blog)
        ].detail = this.blogForm.value.detail;
        this.editingBlog = false;
        this.isSaving = false;
        this.isSaved = true;
        console.log(next);
      },
      (error) => {
        this.editingBlog = false;
        this.isSaving = false;
        this.error = true;
      }
    );
  }

  closeModal() {
    this.image = null;
    this.imagePreview = null;
    this.isSaving = false;
    this.isSaved = false;
    this.error = false;
    this.blogForm.setValue({
      image: '',
      name: '',
      title: '',
      detail: '',
    });
  }
}