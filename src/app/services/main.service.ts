import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Main } from '../interfaces/main';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(
    private _http: HttpClient
  ) { }
  get(): Observable<Main> {
    return this._http.get<Main>(`${environment.api}`);
  }
}
