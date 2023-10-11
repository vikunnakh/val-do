import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "../services/login.service";
@Injectable({
	providedIn: "root",
})
export class VerifyGuard implements CanActivate {
	constructor(private _loginService: LoginService, private _router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if (this._loginService.isLogged()) {
			if (localStorage.getItem(`user`)) {
				const userData: any = JSON.parse(localStorage.getItem(`user`) as string);
				if (userData["isVerify"]) this._router.navigateByUrl(`/verify`);
			}
			return true;
		}
		return true;
	}
}
