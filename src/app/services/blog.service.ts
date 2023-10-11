import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Blog } from '../interfaces/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private _http: HttpClient
  ) { }

  getBlogs(): Observable<Blog[]> {
    return this._http.get<Blog[]>(`${environment.api}/blog/`);
  }

  getBlog(_id: string): Observable<Blog> {
    return this._http.get<Blog>(`${environment.api}/blog/${_id}`);
  }

  addBlog(data: Blog):Observable<Blog> {
    return this._http.post<Blog>(`${environment.api}/blog`, data);
  }

  editBlog(id: string, data: string): Observable<Blog> {
    return this._http.put<Blog>(`${environment.api}/blog${id}`, data)
  }
  delete(id: string) {
    return this._http.delete(`${environment.api}/blog/${id}`);
  }
}

