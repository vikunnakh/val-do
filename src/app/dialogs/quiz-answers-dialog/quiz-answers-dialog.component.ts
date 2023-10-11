import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-quiz-answers-dialog',
  templateUrl: './quiz-answers-dialog.component.html',
  styleUrls: ['./quiz-answers-dialog.component.scss']
})
export class QuizAnswersDialogComponent {
  constructor(
    private _matDialogRef: MatDialogRef<QuizAnswersDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      allAnswers: number;
      correctAnswer: number;
      percentage: number;
    }
  ) {}

  ngOnInit(): void {}

close() {
  this._matDialogRef.close();
}
}
