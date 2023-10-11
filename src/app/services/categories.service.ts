import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _http: HttpClient) { }

  
	/* get all category */
	getCategories(): Observable<Category[]> {
		return this._http.get<Category[]>(`${environment.api}/categories`);
	}

	/* get one category */
	getCategory(id: string): Observable<Category> {
		return this._http.get<Category>(`${environment.api}/categories/${id}`);
	}

	/* add category */
	addCategory(data: Category) {
		return this._http.post(`${environment.api}/categories`, data);
	}

	/* add category */
	editCategory(data: Category) {
		return this._http.put(`${environment.api}/categories`, data);
	}

	/* delete category */
	deleteCategory(id: string) {
		console.log(id);
		return this._http.delete(`${environment.api}/categories/${id}`);
	}
}
