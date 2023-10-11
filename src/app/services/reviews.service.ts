import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Review } from "../interfaces/review";

@Injectable({
	providedIn: "root",
})
export class ReviewsService {
	constructor(private _http: HttpClient) {}

	/* get all reviews for admin */
	getAdminReviews(): Observable<Review[]> {
		return this._http.get<Review[]>(`${environment.api}/reviews/admin`);
	}

	/* delete review for admin */
	deleteAdminReview(courseId: string) {
		return this._http.delete(`${environment.api}/reviews/admin/${courseId}`);
	}

	/* publish review for admin */
	publishAdminReview(data: { courseId: string; isPublished: boolean }) {
		return this._http.put(`${environment.api}/reviews/admin`, data);
	}

	/* get public reviews */
	getReviews(): Observable<Review[]> {
		return this._http.get<Review[]>(`${environment.api}/reviews`);
	}

	/* add review */
	addReviews(data: { star: number; description: string }) {
		return this._http.post(`${environment.api}/reviews`, data);
	}

	/* add review */
	editReviews(data: { id: string; star: number; description: string }) {
		return this._http.put(`${environment.api}/reviews`, data);
	}
}
