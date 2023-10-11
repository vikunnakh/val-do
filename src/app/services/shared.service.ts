import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Member } from "../interfaces/member";
import { Supporter } from "../interfaces/supporter";


@Injectable({
	providedIn: "root",
})
export class SharedService {
	coffeeHeader: any = {
		Authorization: `Bearer ${environment.byMeCofeeApiKy}`,
		"Access-Control-Allow-Origin": "*",
	};

	constructor(private _http: HttpClient) {}

	getCoffeeMembers(page: any = 1): Observable<Member[]> {
		return this._http
			.get<Member[]>(`https://developers.buymeacoffee.com/api/v1/subscriptions`, {
				headers: {
					...this.coffeeHeader,
				},
				params: {
					page,
				},
			})
			.pipe(map((res: any) => res[`data`]));
	}

	getCoffeeSupporters(page: any = 1): Observable<Supporter> {
		return this._http.get<Supporter>(`https://developers.buymeacoffee.com/api/v1/supporters`, {
			headers: {
				...this.coffeeHeader,
			},
			params: {
				page,
			},
		});
	}
}
