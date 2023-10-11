import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(
    private _http: HttpClient
  ) { }
  // get all quizes
  getAllQuizes() {
    return this._http.get(`${environment.api}/quiz`);
  }
  // get current quiz
  getQuiz(id: string) {
    return this._http.get(`${environment.api}/quiz/${id}`);
  }
  // add quiz
  addQuiz(data: any) {
    return this._http.post(`${environment.api}/quiz`, data);
  }
  // edit quiz
  editQuiz(id: string, data: any) {
    return this._http.put(`${environment.api}/quiz/${id}`, data);
  }
  // delete quiz
  deleteQuiz(id: string) {
    return this._http.delete(`${environment.api}/quiz/${id}`);
  }
  // check quiz
  checkQuiz(data: object) {
    return this._http.post(`${environment.api}/quiz/check`, data);
  }
}
