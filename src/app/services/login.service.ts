import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SetPassword } from '../interfaces/set-password';
import { User } from '../interfaces/user';
import { Verify } from '../interfaces/verify';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user$!: Observable<User>;

	constructor(private _http: HttpClient, private _router: Router, private _userService: UserService) {}

	isAdmin() {
		if (localStorage.getItem(`user`)) {
			const isAdmin: User = JSON.parse(localStorage.getItem(`user`) as string);
			if (isAdmin.isAdmin) return true;
		}
		return false;
	}

	isLogged() {
		const token = localStorage.getItem(`token`);
		return token ? true : false;
	}

	logout() {
		localStorage.removeItem(`token`);
		localStorage.removeItem(`user`);
		this._router.navigateByUrl(`/categories`);
	}

	/* set login */
	private _setLogin(data: any, userData: any, isLogin: boolean) {
		localStorage.setItem(`token`, data[`token`]);

		if (isLogin) {
			if (!data[`isVerify`]) {
				this._router.navigate([`/verify`], {
					queryParams: {
						email: userData["email"],
					},
				});
			} else {
				this._router.navigateByUrl(`/profile`);
			}
		} else {
			this._router.navigate([`/verify`], {
				queryParams: {
					email: userData["email"],
				},
			});
		}
	}

	login(data: any) {
		return this._http.post(`${environment.api}/login`, data).pipe(tap((res: any) => this._setLogin(res, data, true)));
	}

	registration(data: any) {
		delete data.rePassword;
		const obj = {
			...data,
		};
		return this._http
			.post(`${environment.api}/registration`, obj)
			.pipe(tap((res: any) => this._setLogin(res, data, false)));
	}

	verify(data: Verify) {
		return this._http.post(`${environment.api}/registration/verification`, data);
	}

	reset(data: any) {
		return this._http.post(`${environment.api}/reset`, data);
	}

	setPassword(data: SetPassword) {
		return this._http.post(`${environment.api}/reset/set-password`, data);
	}
}