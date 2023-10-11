import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/interfaces/question';
import { QuizService } from 'src/app/services/quiz.service';
import { AddQuestionComponent } from '../../dialogs/add-question/add-question.component';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {
  form!: FormGroup;
  isEditMode: boolean = false;
  public questions: Question[] = [];

  constructor(
    private _fb: FormBuilder,
    private _dialog: MatDialog,
    private _quizService: QuizService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
		this._route.snapshot.queryParams["id"] ? (this.isEditMode = true) : (this.isEditMode = false);

		this.form = this._fb.group({
			title: new FormControl(``, [Validators.required]),
			smallDescr: new FormControl(``, [Validators.required]),
			descr: new FormControl(``, [Validators.required]),
		});

		this.editMode();
	}

	editMode() {
		if (this.isEditMode) {
			this._quizService.getQuiz(this._route.snapshot.queryParams["id"]).subscribe((quiz: any) => {
				this.form.patchValue(quiz);
				this.questions = quiz.questions;
			});
		}
	}

	/* delete question */
	deleteQuestion(i: number) {
		this.questions.splice(i, 1);
	}

	/* add questions */
	add() {
		const dialog = this._dialog.open(AddQuestionComponent, {
			width: `800px`,
		});

		dialog.afterClosed().subscribe(
			(data: { isEdit: boolean; question: Question }) => {
				if (data) this.questions.push(data.question);
			},
			(err) => console.log(err)
		);
	}

	/* edit qustion */
	edit(i: number, question: Question) {
		const dialog = this._dialog.open(AddQuestionComponent, {
			width: `800px`,
			data: question,
		});

		dialog.afterClosed().subscribe(
			(data: { isEdit: boolean; question: Question }) => {
				if (data) this.questions[i] = data.question;
			},
			(err) => console.log(err)
		);
	}

	/* add new quiz */
	addQuiz() {
		const data = {
			...this.form.value,
			questions: this.questions,
		};
		if (!this.isEditMode) {
			this._quizService.addQuiz(data).subscribe(
				(res) => {
					this._router.navigateByUrl(`/quiz-list`);
					console.log(res);
				},
				(err) => {
					console.log(err.error);
				}
			);
			return;
		}

		/* if edit mode is enable */
		this._quizService.editQuiz(this._route.snapshot.queryParams["id"], data).subscribe(
			(res) => {
				this._router.navigateByUrl(`/quiz-list`);
				console.log(res);
			},
			(err) => {
				console.log(err.error);
			}
		);
	}
}
