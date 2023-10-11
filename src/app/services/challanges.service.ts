import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Challenge } from '../interfaces/challange';

@Injectable({
  providedIn: 'root'
})
export class ChallangesService {

  constructor(
    private _http: HttpClient
  ) { }
  
	/* get all */
	getChallenges(): Observable<Challenge[]> {
		return this._http.get<Challenge[]>(`${environment.api}/challenges`);
	}

	/* get specific challenge */
	getChallenge(id: string): Observable<Challenge> {
		return this._http.get<Challenge>(`${environment.api}/challenges/${id}`);
	}

	/* add challenge */
	addChallenge(data: any): Observable<Challenge> {
		return this._http.post<Challenge>(`${environment.api}/challenges`, data);
	}

	/* editChallenge */
	editChallenge(data: any): Observable<Challenge> {
		return this._http.put<Challenge>(`${environment.api}/challenges`, data);
	}

	/* delete challenge */
	deleteCallenge(id: string) {
		return this._http.delete(`${environment.api}/challenges/${id}`);
	}
}
