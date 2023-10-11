import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private _http: HttpClient) {}

	uploadImage(image: File) {
		const formData = new FormData();
		formData.append("img", image);
		return this._http.post(`${environment.api}/courses/upload`, formData);
	}

	addCourse(data: object) {
		return this._http.post(`${environment.api}/courses`, data);
	}

	/* edit course */
	editCourse(id: string, data: any) {
		return this._http.put(`${environment.api}/courses/${id}`, data);
	}
}
