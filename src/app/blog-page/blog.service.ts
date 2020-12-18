import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Blog } from 'src/models/Blogs/Blog';
import { Subject } from 'rxjs';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';

const BACKEND_URL = environment.apiUrl + 'api/blogs/';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private blogs: Blog[];
  private blogsStatusListener = new Subject<{
    blogs: Blog[];
    message: string;
  }>();

  constructor(private http: HttpClient) {}

  getWebsiteInfo() {
    return this.blogs;
  }

  getWebsiteInfoStatusListener() {
    return this.blogsStatusListener.asObservable();
  }

  getBlogs() {
    this.http
      .get<{
        blogs: Blog[];
      }>(BACKEND_URL + 'getAll')
      .subscribe(
        (next) => {
          this.blogs = next.blogs;
          this.blogsStatusListener.next({
            blogs: [...next.blogs],
            message: null,
          });
        },
        (error) => {
          this.blogsStatusListener.next({
            blogs: null,
            message: error.error.errorMessage,
          });
        }
      );
  }

  getBlog(id: string) {
    return this.http.get<{ blog: Blog }>(BACKEND_URL + 'getOne/' + id);
  }

  addComment(comment: any, id: string) {
    return this.http.put(BACKEND_URL + 'addComment/' + id, comment);
  }
}
