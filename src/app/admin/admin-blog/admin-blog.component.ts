import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  faAngleDown,
  faAngleUp,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

import { Blog } from '../../../models/Blogs/Blog';
import { BlogService } from './blog.service';

const IMAGE_URL = environment.imgUrl;
@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss'],
})
export class AdminBlogComponent implements OnInit {
  imgUrl = IMAGE_URL;

  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  faEdit = faEdit;

  image;
  imagePreview;

  isLoading = true;
  isSaving = false;
  isSaved = false;
  error = false;

  sortingWay = 'desc';
  propertyName = 'dateAdded';

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
          console.log(blog);
        });
        this.isLoading = false;
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

  save(blog: Blog) {
    this.isSaving = true;
    if (this.blogForm.invalid) {
      return;
    }
    const newBlogForm = new FormData();
    if (this.imagePreview) {
      newBlogForm.append('image', this.image, this.blogForm.value.name);
    } else {
      newBlogForm.append('image', '');
    }
    newBlogForm.append('name', this.blogForm.value.name);
    newBlogForm.append('oldFileName', this.blogForm.value.image);
    newBlogForm.append('title', this.blogForm.value.title);
    newBlogForm.append('detail', this.blogForm.value.detail);
    this.blogService.updateBlog(newBlogForm, blog._id).subscribe(
      (next) => {
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
