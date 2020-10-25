import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Blog } from 'src/models/Blogs/Blog';

const BACKEND_URL = environment.url + 'api/blogs/';

@Injectable({ providedIn: 'root' })
export class BlogService {
  constructor(private http: HttpClient) {}

  getBlogs() {
    return this.http.get<{
      blogs: Blog[];
    }>(BACKEND_URL + 'getAll');
  }

  updateBlog(blog: any, id: string) {
    return this.http.put<{
      message: string;
    }>(BACKEND_URL + 'updateOne/' + id, blog);
  }
}
