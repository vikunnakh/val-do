import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cv } from '../interfaces/cv';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
	public $userData = new ReplaySubject();

	constructor(private _http: HttpClient) {}

	getUser(): Observable<{ user: User; cv: Cv }> {
		return this._http.get<{ user: User; cv: Cv }>(`${environment.api}/user`).pipe(
			tap((res: { user: User; cv: Cv }) => {
				localStorage.setItem("user", JSON.stringify(res.user));
				this.$userData.next(res.user);
			})
		);
	}

	uploadProfilePhoto(image: File): Observable<{ _id: string; profileImage: string }> {
		const formData: FormData = new FormData();
		formData.append("img", image);

		return this._http.post<{ _id: string; profileImage: string }>(`${environment.api}/profile/image`, formData);
	}

	delete(id: string) {
		return this._http.delete(`${environment.api}/profile/image/${id}`);
	}

}
