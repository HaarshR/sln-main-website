import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Blog } from 'src/models/Blogs/Blog';

const BACKEND_URL = environment.apiUrl + 'api/blogs/';

@Injectable({ providedIn: 'root' })
export class BlogService {
  constructor(private http: HttpClient) {}

  getBlogs() {
    return this.http.get<{
      blogs: Blog[];
    }>(BACKEND_URL + 'getAll');
  }

  addBlog(blog: any) {
    return this.http.post<{ message: string; id: string; image: string }>(
      BACKEND_URL + 'addOne',
      blog
    );
  }

  updateBlog(blog: any, id: string) {
    return this.http.put<{
      message: string;
    }>(BACKEND_URL + 'updateOne/' + id, blog);
  }

  deleteBlog(id: string) {
    return this.http.delete<{
      message: string;
    }>(BACKEND_URL + 'deleteOne/' + id);
  }
}
