import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Cv } from "../interfaces/cv";


@Injectable({
	providedIn: "root",
})
export class CvService {
	constructor(private _http: HttpClient) {}

	// add cv
	addCv(data: Cv) {
		return this._http.post(`${environment.api}/cv`, data);
	}

	// edit cv
	editCv(data: Cv) {
		return this._http.post(`${environment.api}/cv/edit`, data);
	}

	// get cv via cv ID
	getCv(id: string): Observable<Cv> {
		return this._http.get<Cv>(`${environment.api}/cv/${id}`);
	}

	// get all CV
	getAllCv(): Observable<Cv[]> {
		return this._http.get<Cv[]>(`${environment.api}/cv`);
	}

	// delete CV
	deleteCv(): Observable<any> {
		return this._http.delete<any>(`${environment.api}/cv`);
	}

	// get skills suggestions
	getSkills(): Observable<any> {
		return this._http.get<any>(`${environment.api}/cv/skills`);
	}
}
