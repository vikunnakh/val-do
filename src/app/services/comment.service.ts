import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Comment } from "../interfaces/comment";

@Injectable({
	providedIn: "root",
})
export class CommentService {
	constructor(private _http: HttpClient) {}

	addComment(courseId: string, data: Comment) {
		return this._http.post<Comment>(`${environment.api}/comment/${courseId}`, data);
	}

	getComments(courseId: string): Observable<Comment[]> {
		return this._http.get<Comment[]>(`${environment.api}/comment/${courseId}`);
	}

	/* delete */
	deleteComment(commentId: string) {
		return this._http.delete(`${environment.api}/comment/${commentId}`);
	}
}
