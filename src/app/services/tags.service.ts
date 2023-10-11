import { HttpClient } from '@angular/common/http';
import { Injectable, ɵisDefaultChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(
    private __http: HttpClient
  ) { }

 
	/* get tags */
	getTags(): Observable<string[]> {
		return this.__http.get<string[]>(`${environment.api}/tags`);
	}

	/* add tag */
	addTag(tagName: string) {
		return this.__http.post(`${environment.api}/tags`, { title: tagName });
	}

	/* edit tag */
	editTag(data: any) {
		return this.__http.put(`${environment.api}/tags`, data);
	}
	/* delete tag */
	deleteTag(id: string) {
		return this.__http.delete(`${environment.api}/tags/${id}`);
	}
}
