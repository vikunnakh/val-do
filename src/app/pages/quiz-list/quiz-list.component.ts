import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent {
  quizes$!: Observable<any>;

  constructor(
    private _quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.quizes$ = this._quizService.getAllQuizes();
  }

}
