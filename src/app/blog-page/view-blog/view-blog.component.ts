import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { NavbarService } from 'src/app/shared/navbar/navbar.service';
import { Blog } from 'src/models/Blogs/Blog';
import { Comment } from 'src/models/Blogs/Comment';
import { PageData } from 'src/models/PageData';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.scss'],
})
export class ViewBlogComponent implements OnInit {
  private pageData: PageData = {
    navBackground: '#ffffff',
    navLink: '#000000',
    specialNavLink: '#546c55',
    togglerColor: '#546c55',
    visible: true,
  };

  blogID;
  blog: Blog;
  blogSub: Subscription;

  isLoading = true;

  faArrowLeft = faArrowLeft;

  commentForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
    }),
    anonymous: new FormControl('', {
      validators: [Validators.required],
    }),
    comment: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  constructor(
    private navbarService: NavbarService,
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.navbarService.setPageData(this.pageData);
    this.blogID = this.route.snapshot.params.id;
    this.blogService.getBlog(this.blogID).subscribe(
      (next) => {
        this.blog = next.blog;
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.router.navigate['blog'];
      }
    );
  }

  commentPost() {
    if (
      (!this.commentForm.value.anonymous && !this.commentForm.value.name) ||
      !this.commentForm.value.comment
    ) {
      return;
    }
    if (
      (!this.commentForm.value.anonymous && this.commentForm.value.name == '') ||
      this.commentForm.value.comment == ''
    ) {
      return;
    }
    let anonymous;
    if (!this.commentForm.value.anonymous) {
      anonymous = 'false';
    } else {
      anonymous = 'true';
    }

    this.blogService
      .addComment(
        {
          anonymous: anonymous,
          name: this.commentForm.value.name,
          comment: this.commentForm.value.comment,
        },
        this.blogID
      )
      .subscribe(
        (next) => {
          this.blog.comments.unshift({
            name:
              anonymous == 'false'
                ? this.commentForm.value.name
                : 'Anonymous User',
            comment: this.commentForm.value.comment,
            date: new Date(),
            anonymous: anonymous,
          });
          this.commentForm.setValue({
            name: '',
            anonymous: '',
            comment: '',
          });
        },
        (error) => {
          console.log(error);
        }
      );
    // (!this.commentForm.value.name && this.commentForm.value.anonymous) || (this.commentForm.value.name && !this.commentForm.value.anonymous)
  }
}
