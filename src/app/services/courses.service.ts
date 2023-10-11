import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Course } from "../interfaces/course";

@Injectable({
	providedIn: "root",
})
export class CoursesService {
	constructor(private _http: HttpClient) {}

	/* get courses by tags */
	getCoursesByTags(id: string): Observable<Course[]> {
		return this._http.get<Course[]>(`${environment.api}/courses/tag/${id}`);
	}

	/* get all courses */
	getCourses(id: string, queryParam?: any): Observable<Course[]> {
		if (queryParam) {
			let params = new HttpParams();
			for (let i = 0; i < Object.keys(queryParam).length; i++) {
				params = params.append(Object.keys(queryParam)[i], Object.values(queryParam)[i] as string);
			}
			return this._http.get<Course[]>(`${environment.api}/courses/${id}`, {
				params: params,
			});
		}
		return this._http.get<Course[]>(`${environment.api}/courses/${id}`);
	}

	/* get cuttent course */
	getCourse(id: string): Observable<Course> {
		return this._http
			.get<Course>(`${environment.api}/courses/detail/${id}`)
			.pipe(map((res: any) => res["data"] as Course));
	}

	/* delete course */
	deleteCourse(id: string) {
		return this._http.delete(`${environment.api}/courses/${id}`);
	}

	/* add to favorites */
	addToFavs(id: string) {
		return this._http.put(`${environment.api}/user/add-to-favorites`, {
			courseId: id,
		});
	}

	/* delete from favorites */
	deleteFromFavs(id: string) {
		return this._http.delete(`${environment.api}/user/delete-from-favorites/${id}`);
	}

	/* get favorites */
	getFavorites(favorites: string[]): Observable<Course[]> {
		return this._http.post<Course[]>(`${environment.api}/courses/get-favorites`, {
			favorites: favorites,
		});
	}

	search(keyword: string) {
		return this._http.get(`${environment.api}/courses/search/filter`, {
			params: {
				keyword,
			},
		});
	}
}
