import { Component, OnInit } from '@angular/core';
import { PageData } from 'src/models/PageData';
import { NavbarService } from '../shared/navbar/navbar.service';
import { BlogService } from './blog.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss'],
})
export class BlogPageComponent implements OnInit {
  private pageData: PageData = {
    navBackground: '#ffffff',
    navLink: '#000000',
    specialNavLink: '#546c55',
    togglerColor: '#546c55',
    visible: true,
  };

  isLoading = true;

  blogs;

  constructor(
    private navbarService: NavbarService,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.navbarService.setPageData(this.pageData);
    this.blogService.getBlogs();
    this.blogService.getWebsiteInfoStatusListener().subscribe((next) => {
      this.blogs = next.blogs;
      this.isLoading = false;
    });
  }
}
